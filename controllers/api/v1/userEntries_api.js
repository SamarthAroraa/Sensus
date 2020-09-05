const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
const ObjectId = require("mongodb").ObjectID;

module.exports.index = async function (req, res) {
  try {
    //user will a string eg.5f4ba5769fdc69d27fd2725b this will be the id of the user
    //so we need to convert it into mongoId format for comparison
    let user = ObjectId(req.body.user);

    //this gets us all the instances where the passed condition holds true
    await Entry.find({
      user: user,
    })
      .sort("-createdAt")
      .exec(function (err, docs) {
        if (err) {
          console.log(err);
          return err;
        }
        user_entries = docs;
        return res.status(200).json(docs);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};
