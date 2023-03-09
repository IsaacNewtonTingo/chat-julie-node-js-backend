const { Message } = require("../models/message");

exports.getMessages = async (req, res) => {
  try {
    const chatID = req.params.id;
    const messages = await Message.find({ chat: chatID }).populate(
      "user",
      "firstName lastName avatar"
    );

    res.json({
      status: "Success",
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while getting conversation",
    });
  }
};
