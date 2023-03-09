const express = require("express");
const { textCompletion } = require("../controller/text-completion");
const router = express.Router();

const authenticate = require("../middleware/jwt");

router.post("/text-completion", authenticate, textCompletion);

module.exports = router;
