const { Configuration, OpenAIApi } = require("openai");
// Configure the OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openai = new OpenAIApi(configuration);
