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
    chatCode: {
      type: Number,
      default: 0, //0-Text completion, 1-Image generation
    },
  },
  { timestamps: true }
);

exports.Chat = mongoose.model("Chat", ChatSchema);
