const { sms } = require("../config/africastalking");
const { Otp } = require("../models/otp");

async function sendSMS(phoneNumber, message, res) {
  try {
    //delete existing
    const options = {
      to: `+${phoneNumber}`,
      message: message,
    };

    await sms.send(options);
    res.json({
      status: "Success",
      message: "OTP sent successfully.Please verify your phone",
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
  sendSMS,
};
