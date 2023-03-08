const express = require("express");
const {
  createChat,
  getUserChats,
  deleteConversation,
} = require("../controller/chat");
const router = express.Router();

router.post("/create-chat", createChat);
router.get("/get-user-chats/:id", getUserChats);
router.put("/delete-conversation/:id", deleteConversation);

module.exports = router;
