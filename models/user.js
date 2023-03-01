const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userID: String,
    fullName: String,
    email: String,
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
