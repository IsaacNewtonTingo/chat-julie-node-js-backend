const { openai } = require("../config/open-ai");
const { Chat } = require("../models/chat");
const { Message } = require("../models/message");

exports.imageGenerator = async (req, res) => {
  const { user, messageID, prompt, chatName, chatID } = req.body;
  const temperature = 0.5;
  const model = "gpt-3.5-turbo";

  try {
    const response = await openai.createImage({
      prompt,
      size: "1024x1024",
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
          content: prompt,
        });

        //store the ai message
        await Message.create({
          messageID: responseId,
          user: {
            userID: 1,
            name: "Chat Julie",
            avatar: null,
          },
          role: "assistant",
          chat: existingChat._id,
          content: response.data.data[0].url,
          image: response.data.data[0].url,
        });
      } else {
        //create chat then add message
        const newChat = await Chat.create({
          user,
          chatID,
          chatName,
        });

        //store user message
        await Message.create({
          messageID,
          user,
          role: "user",
          chat: newChat._id,
          content: prompt,
        });

        //store ai response
        await Message.create({
          messageID: responseId,
          user: {
            userID: 1,
            name: "Chat Julie",
            avatar: null,
          },
          role: "assistant",
          chat: newChat._id,
          content: response.data.data[0].url,
          image: response.data.data[0].url,
        });
      }
      // Return the generated text as a response
      res.json({
        status: "Success",
        message: "Image generated successfully",
        data: response.data.data[0].url,
      });
    } else {
      res.json({
        status: "Failed",
        message: "An error occured while trying to process request",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while trying to generate image",
    });
  }
};
