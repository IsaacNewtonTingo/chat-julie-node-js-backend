const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: "String",
    },
    password: String,
    avatar: {
      type: String,
      default: null,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    roleID: {
      type: Number,
      default: 2, //0-superadmin, 1-admin, 2-regularuser
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
