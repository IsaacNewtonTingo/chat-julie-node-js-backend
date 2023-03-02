const express = require("express");
const { textCompletion } = require("../controller/text-completion");
const router = express.Router();

router.post("/text-completion", textCompletion);

module.exports = router;
