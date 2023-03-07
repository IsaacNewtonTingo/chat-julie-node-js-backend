const { Message } = require("../models/message");

exports.storeMessage = async (req, res) => {
  try {
    const { messageID, chat, content, image } = req.body;
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const chatID = req.params.id;
    const messages = await Message.find({ chat: chatID });

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
