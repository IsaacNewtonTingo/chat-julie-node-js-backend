const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser").json;

app.use(cors());
app.use(bodyParser());

require("dotenv").config();

const PORT = process.env.PORT;

require("./config/db");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const ImageGeneratorRouter = require("./routes/image-generator");
const TextCompletionRouter = require("./routes/text-completion");
const ChatRouter = require("./routes/chat");
const MessageRouter = require("./routes/message");
const UserRouter = require("./routes/user");

app.use("/api/user", UserRouter);
app.use("/api/image", ImageGeneratorRouter);
app.use("/api/text", TextCompletionRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/message", MessageRouter);
