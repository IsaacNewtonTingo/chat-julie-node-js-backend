const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    chatName: String,
    chatID: String,
  },
  { timestamps: true }
);

exports.Chat = mongoose.model("Chat", ChatSchema);
