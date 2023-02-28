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

app.use("/api/open-ai", ImageGeneratorRouter);
