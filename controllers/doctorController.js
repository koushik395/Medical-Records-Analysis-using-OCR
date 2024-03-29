const multer = require("multer");
const sharp = require("sharp");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

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

exports.uploadDoctorPhoto = upload.single("photo");

exports.resizeDoctorPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const ext = req.file.mimetype.split("/")[1];

  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat(ext)
    .jpeg({ quality: 90 })
    .toFile(`client/public/img/doctor/${req.file.filename}`);

  next();
});

exports.resizeDoctorSignup = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const ext = req.file.mimetype.split("/")[1];

  req.file.filename = `user-${req.body.contactNumber}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat(ext)
    .jpeg({ quality: 90 })
    .toFile(`client/public/img/doctor/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doctors.length,
    data: {
      doctors,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.aggregate([
    {
      $match: req.body, // Assuming req.body contains the criteria for finding the user
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
  if (!user || user.length === 0) {
    return next(new AppError("User or Medical records not found!", 404));
  }

  res.status(200).json({
    status: "success",
    user,
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
    "doctorId",
    "email",
    "contactNumber",
    "country",
  );

  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: {
      doctor: updatedDoctor,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Doctor.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
