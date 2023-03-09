const express = require("express");
const { getMessages } = require("../controller/message");
const router = express.Router();

const authenticate = require("../middleware/jwt");

router.get("/get-messages/:id", authenticate, getMessages);

module.exports = router;
