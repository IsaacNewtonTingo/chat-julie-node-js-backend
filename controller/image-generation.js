const { openai } = require("../config/open-ai");

exports.imageGenerator = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createImage({
      prompt,
      size: "1024x1024",
    });

    res.json({
      status: "Success",
      message: "Image generated successfully",
      data: response.data.data[0].url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while trying to generate image",
    });
  }
};
