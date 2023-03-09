const express = require("express");
const {
  createChat,
  getUserChats,
  deleteConversation,
} = require("../controller/chat");
const router = express.Router();

const authenticate = require("../middleware/jwt");

router.get("/get-user-chats/:id", authenticate, getUserChats);
router.put("/delete-conversation/:id", authenticate, deleteConversation);

module.exports = router;
