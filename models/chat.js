const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    chatName: String,
    chatID: String,
    user: {
      userID: String,
      name: String,
      avatar: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

exports.Chat = mongoose.model("Chat", ChatSchema);
