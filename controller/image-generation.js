const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//req
exports.imageGenerator = async (req, res) => {
  const { prompt } = req.body;

  try {
    const image = await openai.createImage({
      prompt,
      size: "1024x1024",
      response_format: "b64_json",
    });

    res.json({
      status: "Success",
      message: "Image generated successfully",
      data: image,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while trying to generate image",
    });
  }
};
