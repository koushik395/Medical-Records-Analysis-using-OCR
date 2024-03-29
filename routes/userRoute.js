const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  userController.uploadUserPhoto,
  userController.resizeUserSignup,
  authController.signup,
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect); // Route middleware to check if the user is logged in before accessing routes that need authentication
// Protected routes below this line

router.get("/", authController.getCurrentUser);
router.get("/prescriptions", userController.getUserPrescriptions);
router.get("/stats", userController.getMyStats);

router.patch("/updateMyPassword", authController.updatePassword);

router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);

router.post(
  "/addHealthReport",
  userController.uploadUserPrescription,
  userController.updateHealthReport,
);

module.exports = router;
