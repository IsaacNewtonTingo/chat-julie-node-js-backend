const express = require("express");
const {
  signup,
  register,
  login,
  sendForgotPasswordOtp,
  changePassword,
} = require("../controller/user");
const { verifyOTP } = require("../middleware/verify-otp");
const router = express.Router();

router.post("/signup", signup);
router.post("/register", verifyOTP, register);
router.post("/login", login);
router.post("/forgot-password", sendForgotPasswordOtp);
router.post("/reset-password", verifyOTP, changePassword);

module.exports = router;
