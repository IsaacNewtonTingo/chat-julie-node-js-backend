const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    UserID: String,
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
