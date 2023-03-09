const { openai } = require("../config/open-ai");
const { Chat } = require("../models/chat");
const { Message } = require("../models/message");
require("dotenv").config();

const chatJulieID = process.env.CHAT_JULIE_ID;

exports.textCompletion = async (req, res) => {
  const { messages, user, messageID, content, chatName, chatCode, chatID } =
    req.body;
  const temperature = 0.5;
  const model = "gpt-3.5-turbo";

  try {
    const response = await openai.createChatCompletion({
      model,
      messages,
      temperature,
    });

    if (response) {
      //store the chat and message
      let responseId = Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString();
      const existingChat = await Chat.findOne({ chatID });
      if (existingChat) {
        //add the messages for the given user
        await Message.create({
          messageID,
          user,
          role: "user",
          chat: existingChat._id,
          content,
        });

        //store the ai message
        await Message.create({
          messageID: responseId,
          user: chatJulieID,
          role: "assistant",
          chat: existingChat._id,
          content: response.data.choices[0].message.content,
        });
      } else {
        //create chat then add message
        const newChat = await Chat.create({
          user,
          chatID,
          chatName,
          chatCode,
        });

        //store user message
        await Message.create({
          messageID,
          user,
          role: "user",
          chat: newChat._id,
          content,
        });

        //store ai response
        await Message.create({
          messageID: responseId,
          user: chatJulieID,
          role: "assistant",
          chat: newChat._id,
          content: response.data.choices[0].message.content,
        });
      }
      // Return the generated text as a response
      res.json({
        status: "Sucess",
        message: "Successfully completed text",
        data: response.data.choices[0].message.content,
      });
    } else {
      res.json({
        status: "Failed",
        message: "An error occured while trying to process request",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
