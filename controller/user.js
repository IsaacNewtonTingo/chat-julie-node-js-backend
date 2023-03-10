const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helpers/send-email");

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
      let code = Math.floor(1000000 + Math.random() * 9000000).toString();

      const hashedCode = await bcrypt.hash(code, 10);

      await Otp.deleteMany({ email });

      await Otp.create({
        email,
        otp: hashedCode,
        user: null,
      });

      const message = `<p>
        You have requested to reset your email. Enter the below otp to complete the process.<br/>
        Code <b>expires in 5 minutes.
        <br/>
        <br/>
      <h1>${code}</h1>
      `;

      sendEmail(email, message, res);
    } else {
      res.json({
        status: "Failed",
        message: "User with the given email doesn't exist",
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

    //update password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.json({
      status: "Success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while verifying otp",
    });
  }
};

//update password
exports.updatePassword = async (req, res) => {
  try {
    const userID = req.params.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ _id: userID });
    if (user) {
      const storedPassword = user.password;
      const correctPassword = await bcrypt.compare(oldPassword, storedPassword);

      if (correctPassword) {
        //hash new
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        //update
        await user.updateOne({ password: hashedNewPassword });
        res.json({
          status: "Success",
          message: "You have successfully changed your password",
        });
      } else {
        res.json({
          status: "Failed",
          message: "Your old password is incorrect",
        });
      }
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
      message: "An error occured while updating password",
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

//create chat julie
exports.createChatJulie = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    await User.create({
      firstName,
      lastName,
      email,
      password,
      roleID: null,
    });

    res.json({
      status: "Success",
      message: "Chat Julie created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while creating Chat Julie",
    });
  }
};

exports.getChatJulie = async (req, res) => {
  const userID = req.params.id;
  try {
    const julie = await User.findOne({ _id: userID });
    res.json({
      status: "Success",
      message: "Chat Julie retrieved successfully",
      data: julie,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while creating Chat Julie",
    });
  }
};

//
