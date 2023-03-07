const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    messageID: String,
    user: {
      userID: String,
      name: String,
      avatar: String,
    },
    role: {
      type: String,
      default: "user",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    content: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

exports.Message = mongoose.model("Message", MessageSchema);
