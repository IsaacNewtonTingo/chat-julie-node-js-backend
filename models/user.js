const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: {
      type: Number,
    },
    password: String,
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
