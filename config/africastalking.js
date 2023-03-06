const credentials = {
  apiKey: process.env.AFRICAS_TALKING_API_KEY,
  username: process.env.AFRICAS_TALKING_USER_NAME,
};

exports.sms = AfricasTalking = require("africastalking")(credentials);
