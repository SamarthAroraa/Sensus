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

    penName: {
      type: String,
    },

    usePenNameDefault: {
      type: Boolean,
      default: false,
    },
    defaultName: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      default: "",
    },

    facebookURL: {
      type: String,
      default: "",
    },

    twitterURL: {
      type: String,
      default: "",
    },

    instagramURL: {
      type: String,
      default: "",
    },

    linkedinURL: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
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
