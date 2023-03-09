const express = require("express");
const {
  signup,
  register,
  login,
  sendForgotPasswordOtp,
  changePassword,
  createChatJulie,
  getChatJulie,
  updatePassword,
} = require("../controller/user");
const { verifyOTP } = require("../middleware/verify-otp");
const router = express.Router();

const authenticate = require("../middleware/jwt");

router.post("/signup", signup);
router.post("/register", verifyOTP, register);
router.post("/login", login);
router.post("/forgot-password", sendForgotPasswordOtp);
router.post("/reset-password", verifyOTP, changePassword);
router.post("/update-password/:id", authenticate, updatePassword);

router.post("/create-chat-julie", createChatJulie);
router.get("/get-chat-julie", getChatJulie);

module.exports = router;
