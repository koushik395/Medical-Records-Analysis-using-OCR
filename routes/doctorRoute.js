const express = require("express");
const doctorController = require("../controllers/doctorController");
const authController = require("../controllers/doctorauthController");

const router = express.Router();

router.post(
  "/signup",
  doctorController.uploadDoctorPhoto,
  doctorController.resizeDoctorSignup,
  authController.signup,
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.get("/", authController.getCurrentDoctor);

router.patch(
  "/updateMyPassword",
  authController.restrictTo("doctor"),
  authController.updatePassword,
);

router.patch(
  "/updateMe",
  authController.restrictTo("doctor"),
  doctorController.uploadDoctorPhoto,
  doctorController.resizeDoctorPhoto,
  doctorController.updateMe,
);

router
  .route("/")
  .post(authController.restrictTo("doctor"), doctorController.getUser);

module.exports = router;
