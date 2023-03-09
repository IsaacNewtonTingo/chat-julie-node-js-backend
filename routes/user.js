const express = require("express");
const { signup, register, login } = require("../controller/user");
const { verifyOTP } = require("../middleware/verify-otp");
const router = express.Router();

router.post("/signup", signup);
router.post("/register", verifyOTP, register);
router.post("/login", login);

module.exports = router;
