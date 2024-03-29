const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Schema -> Model creation -> using the model with data
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    trim: true,
  },
  doctorId: {
    type: String,
    required: [true, "Doctor Id must be provided"],
  },
  age: {
    type: Number,
    required: [true, "Age must be provided"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide your contact number."],
    unique: true,
    validate: [
      validator.isMobilePhone,
      "Please provide a valid contact number",
    ],
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "doctor",
  },
  photo: {
    type: String,
    default: "default-user.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // hide this field from the output
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

doctorSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

doctorSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

doctorSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

doctorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

doctorSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

doctorSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Doctor = mongoose.model("Doctor", doctorSchema); //model name first letter in caps

module.exports = Doctor;
