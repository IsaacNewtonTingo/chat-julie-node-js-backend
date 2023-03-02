const express = require("express");
const { getMessages } = require("../controller/message");
const router = express.Router();

router.get("/get-messages", getMessages);

module.exports = router;
