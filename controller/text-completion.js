const { openai } = require("../config/open-ai");

exports.textCompletion = async (req, res) => {
  const { prompt } = req.body;
  const maxTokens = 128;
  const temperature = 0.5;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: temperature,
    });
    // Return the generated text as a response
    res.json({
      status: "Sucess",
      message: "Successfully completed text",
      data: response.data.choices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
