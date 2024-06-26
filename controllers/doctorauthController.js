const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const Doctor = require("../models/doctorModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (doctor, statusCode, res) => {
  const token = signToken(doctor._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  doctor.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      doctor,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Doctor.create({
    name: req.body.name,
    age: req.body.age,
    doctorId: req.body.doctorId,
    email: req.body.email,
    country: req.body.country,
    gender: req.body.gender,
    contactNumber: req.body.contactNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (req.file) newUser.photo = req.file.filename;
  await newUser.save({ validateBeforeSave: false });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const doctor = await Doctor.findOne({ email }).select("+password");

  if (!doctor || !(await doctor.correctPassword(password, doctor.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(doctor, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await Doctor.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['doctor', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = doctor.createPasswordResetToken();
  await doctor.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "origin",
  )}/resetPassword/doctor/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: doctor.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    doctor.passwordResetToken = undefined;
    doctor.passwordResetExpires = undefined;
    await doctor.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const doctor = await Doctor.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!doctor) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  doctor.password = req.body.password;
  doctor.passwordConfirm = req.body.passwordConfirm;
  doctor.passwordResetToken = undefined;
  doctor.passwordResetExpires = undefined;
  await doctor.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(doctor, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const doctor = await Doctor.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (
    !(await doctor.correctPassword(req.body.passwordCurrent, doctor.password))
  ) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  doctor.password = req.body.password;
  doctor.passwordConfirm = req.body.passwordConfirm;
  await doctor.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(doctor, 200, res);
});

exports.getCurrentDoctor = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
      );

      // 2) Check if user still exists
      const currentUser = await Doctor.findById(decoded.id);
      if (!currentUser || currentUser.changedPasswordAfter(decoded.iat)) {
        return res.status(400).json({
          status: "fail",
          message: "User not logged in or does not exist",
        });
      }

      // Send current user back who is logged in
      res.status(200).json({
        status: "success",
        user: currentUser,
      });
    } catch (err) {
      return next(new AppError(err, 500));
    }
  }
};
