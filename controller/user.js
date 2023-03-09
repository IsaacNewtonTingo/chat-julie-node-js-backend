const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helpers/send-email");

const { sendSMS } = require("../helpers/send-sms");
const { Otp } = require("../models/otp");
const { User } = require("../models/user");

exports.signup = async (req, res) => {
  var { email } = req.body;

  email = email.toString().trim();

  try {
    //check if phone number is already registered
    await User.findOne({ email }).then(async (response) => {
      if (response) {
        res.json({
          status: "Failed",
          message: "The provided email is already registered",
        });
      } else {
        //send verification code
        let code = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedCode = await bcrypt.hash(code, 10);

        await Otp.deleteMany({ email });

        await Otp.create({
          email,
          otp: hashedCode,
          user: null,
        });

        const message = `<p>
          Verify your email to complete your signup process.<br/>
          Code <b>expires in 5 minutes.
          <br/>
          <br/>
        <h1>${code}</h1>
        `;

        sendEmail(email, message, res);
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while signing up",
    });
  }
};

exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    //create user

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "Success",
      message:
        "OTP verified successfully and your account was created. Please login.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while verifying code",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      //user not found
      res.json({
        status: "Failed",
        message: "No user found with the given email. Please sign up",
      });
    } else {
      //user found
      //compare passwords
      const hashedPassword = user.password;
      const validUser = await bcrypt.compare(password, hashedPassword);
      if (!validUser) {
        //wrong password
        res.json({
          status: "Failed",
          message: "Wrong password. Please try again",
        });
      } else {
        //correct password
        //send token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.json({
          status: "Success",
          message: "Login successfull",
          data: {
            userID: user._id,
            roleID: user.roleID,
            premium: user.premium,
            token: token,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

//forget password
exports.sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    //check if number exists
    const user = await User.findOne({ email });
    if (user) {
      await ForgotPassword.findOneAndDelete({ email });

      let verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

      const hashedPassword = await bcrypt.hash(verificationCode, 10);

      const newForgot = new ForgotPassword({
        email,
        verificationCode: hashedPassword,
      });

      await newForgot.save();

      const sms = AfricasTalking.SMS;
      const options = {
        to: `+${email}`,
        message: `${verificationCode}`,
        // from: "Party finder",
      };

      await sms.send(options);
      res.json({
        status: "Success",
        message: "OTP sent sent successfully. Code expires in 5 minute",
      });
    } else {
      res.json({
        status: "Failed",
        message: "User with the given phone number doesn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while sending otp",
    });
  }
};

//verify otp
exports.changePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const existingRecord = await ForgotPassword.findOne({ email });
    if (existingRecord) {
      const storedOtp = existingRecord.verificationCode;

      const correctOtp = await bcrypt.compare(otp.toString(), storedOtp);
      if (correctOtp) {
        //update password

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        //delete record
        await existingRecord.deleteOne();

        res.json({
          status: "Success",
          message: "Password changed successfully",
        });
      } else {
        res.json({
          status: "Failed",
          message: "Invalid otp entered",
        });
      }
    } else {
      res.json({
        status: "Failed",
        message: "Invalid otp entered",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while verifying otp",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const user = await User.findOne({ _id: userID });
    if (user) {
      res.json({
        status: "Success",
        message: "User data retrieved successfully",
        data: user,
      });
    } else {
      res.json({
        status: "Failed",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while retrieving user data",
    });
  }
};
