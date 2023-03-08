const { Chat } = require("../models/chat");
const { Message } = require("../models/message");

exports.createChat = async (req, res) => {
  try {
    const { messageID, user, content, chatName, chatID, image } = req.body;

    const existingChat = await Chat.findOne({ chatID });
    if (existingChat) {
      //add the messages
      await Message.create({
        messageID,
        user,
        chat: existingChat._id,
        content,
        image,
      });

      res.json({
        status: "Sucess",
        message: "Message stored successfully",
      });
    } else {
      //create chat then add message
      const newChat = await Chat.create({
        user,
        chatID,
        chatName,
      });

      await Message.create({
        messageID,
        user,
        chat: newChat._id,
        content,
        image,
      });

      res.json({
        status: "Sucess",
        message: "Message stored successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while saving message",
    });
  }
};

exports.getUserChats = async (req, res) => {
  try {
    const userID = req.params.id;

    const chats = await Chat.find({
      $and: [{ "user.userID": userID }, { deleted: false }],
    });

    res.json({
      status: "Success",
      message: "Chats retrieved successfully",
      data: chats,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while getting chats",
    });
  }
};

//delete
exports.deleteConversation = async (req, res) => {
  try {
    const converesationID = req.params.id;
    const chat = await Chat.findOne({
      $and: [{ _id: converesationID }, { deleted: false }],
    });
    if (chat) {
      await chat.updateOne({ deleted: true });
      res.json({
        status: "Success",
        message: "Conversation deleted successfully",
      });
    } else {
      res.json({
        status: "Failed",
        message: "Conversation not found. Might have already been deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while deleting conversation",
    });
  }
};
