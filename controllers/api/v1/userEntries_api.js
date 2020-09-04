const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
const ObjectId = require("mongodb").ObjectID;

module.exports.index = async function (req, res) {
    let entries = await Entry.find({}).sort("-createdAt").populate("user");

    let users= await User.find({}).sort("-createdAt").populate("user");


    return res.status(200).json({
      message: "List of user specific entries",
      // entries: entries
      userEntry: users,
    });
  };