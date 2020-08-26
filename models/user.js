const mongoose = require("mongoose");

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

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    penName: {
      type: String,
    },

    usePenNameDefault: {
      type: Boolean,
      default: false,
    },

    about: {
      type: String,
    },

    facebookURL: {
      type: String,
    },

    twitterURL: {
      type: String,
    },

    instagramURL: {
      type: String,
    },

    linkedinURL: {
      type: String,
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
