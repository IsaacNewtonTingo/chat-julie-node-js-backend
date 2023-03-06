const { sms } = require("../config/africastalking");

async function sendSMS(phoneNumber, message, res) {
  try {
    const options = {
      to: `+${phoneNumber}`,
      message: message,
      // from: "Party finder",
    };

    await sms.send(options);
    res.json({
      status: "Success",
      message: "OTP sent successfully",
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
