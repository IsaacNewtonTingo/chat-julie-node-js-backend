const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/jwt");

const { imageGenerator } = require("../controller/image-generation");

router.post("/generate-image", authenticate, imageGenerator);

module.exports = router;
