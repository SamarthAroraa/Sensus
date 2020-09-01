const mongoose = require("mongoose");

//////////////////////////////////////
//          Entry Schema            //
//////////////////////////////////////
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
      default: "transparent",
    },
    createDate: {
      type: String,
      required: true,
      default: today,
    },
    updateDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
