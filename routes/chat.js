const express = require("express");
const { createChat, getUserChats } = require("../controller/chat");
const router = express.Router();

router.post("/create-chat", createChat);
router.get("/get-user-chats/:id", getUserChats);

module.exports = router;
