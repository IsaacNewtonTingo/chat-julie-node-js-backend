const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

async function sendEmail(email, message, res) {
  try {
    //delete existing
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html: message,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      status: "Success",
      message:
        "A one time password has been sent to your email. Please verify your email to complete the signup process",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while trying to send otp",
    });
  }
}

module.exports = {
  sendEmail,
};
