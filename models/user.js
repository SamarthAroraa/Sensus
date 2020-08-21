const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

//////////////////////////////////////
//          User Schema             //
//////////////////////////////////////
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    //array of the entries made by the user
    entries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Entry" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
