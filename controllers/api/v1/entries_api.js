const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
module.exports.index = async function (req, res) {
  let entries = await Entry.find({}).sort("-createdAt").populate("user");
  return res.status(200).json({
    message: "List of entries",
    entries: entries,
  });
};

module.exports.createUpdate = async function (req, res) {
  try {
    let text = req.body.text;
    let title = req.body.title;
    let date = req.body.date;
    let uid = req.body.user_id;
    let user = await User.findById(uid);
    let entry_for_date = await Entry.findOne({ createDate: date });

    // console.log(user, "userr");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    let new_entry;
    const color = await SentimentApi.analyze(text);
    if (!entry_for_date) {
      new_entry = await Entry.create({
        user: user,
        text: text,
        mood: color,
        createDate: date,
      });
    }
    else{
        entry_for_date.text=text;
        entry_for_date.title= title;
        entry_for_date.updateDate = Date.now();
        entry_for_date.save();
    }
  
    return res.status(200).json({
      message: "Here is the user making the entry",
      user: user,
      color: color,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};
