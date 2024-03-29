const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { geminiApi } = require("../models/geminiModel");

const multerStorage = multer.memoryStorage();
const multerPrescriptionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/public/img/patient/prescriptions");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
const prescriptionUpload = multer({
  storage: multerPrescriptionStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");
exports.uploadUserPrescription = prescriptionUpload.single("prescription");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const ext = req.file.mimetype.split("/")[1];

  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat(ext)
    .jpeg({ quality: 90 })
    .toFile(`client/public/img/patient/${req.file.filename}`);

  next();
});

exports.resizeUserSignup = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const ext = req.file.mimetype.split("/")[1];

  req.file.filename = `user-${req.body.contactNumber}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat(ext)
    .jpeg({ quality: 90 })
    .toFile(`client/public/img/patient/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "contactNumber",
    "city",
    "country",
  );

  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateHealthReport = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const path = `client/public/img/patient/prescriptions/${req.file.filename}`;
  const { conditionText, suggestionText } = await geminiApi(
    path,
    req.file.mimetype,
  );

  user.healthReport.push({
    prescription: req.file.filename,
    healthStatus: conditionText,
    suggestion: suggestionText,
  });

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getUserPrescriptions = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new AppError("User not found", 400));
    }
    const healthDataByYear = {};
    user.healthReport.forEach((report) => {
      const { year, prescription, uploadedAt } = report;
      if (!healthDataByYear[year]) {
        healthDataByYear[year] = [];
      }
      healthDataByYear[year].push({ prescription, uploadedAt, year });
    });
    // Sort prescriptions within each year
    Object.keys(healthDataByYear).forEach((year) => {
      healthDataByYear[year].sort((a, b) => a.uploadedAt - b.uploadedAt);
    });

    res.status(200).json({
      status: "success",
      data: healthDataByYear,
    });
  } catch (error) {
    return next(new AppError("Failed to get user prescriptions", 400));
  }
});

exports.getMyStats = catchAsync(async (req, res, next) => {
  const { email } = req.user;
  const condition = { email: email };
  const user = await User.aggregate([
    {
      $match: condition, // Assuming req.body contains the criteria for finding the user
    },
    {
      $unwind: "$healthReport", // Unwind the healthReport array to treat each element as a separate document
    },
    {
      $sort: { "healthReport.uploadedAt": -1 }, // Sort by the uploadedAt field in descending order
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" }, // Include other fields from the user document if needed
        age: { $first: "$age" },
        email: { $first: "$email" },
        contactNumber: { $first: "$contactNumber" },
        city: { $first: "$city" },
        gender: { $first: "$gender" },
        country: { $first: "$country" },
        role: { $first: "$role" },
        photo: { $first: "$photo" },
        healthReport: { $push: "$healthReport" }, // Group the health reports back into an array
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    user,
  });
});
