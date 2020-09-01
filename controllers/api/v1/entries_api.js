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
    //   req=await req.json();
    // var body_parsed = JSON.parse(req.body.)
    let text = req.body.text;
    let title = req.body.title;
    let date = req.body.date;
    let uid = req.body.user_id;
    console.log(req.body);
    let user = await User.findById(uid);
    let entry_for_date = await Entry.findOne({ createDate: date });

    // console.log(user, "userr");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //to be returned in response
    let new_entry;
    let mode; //Update or create (U or C respectively)
    const color = await SentimentApi.analyze(text);
    if (!entry_for_date) {
      new_entry = await Entry.create({
        title: title,
        user: user,
        text: text,
        mood: color,
        createDate: date,
      });
      mode = "C";
    } else {
      entry_for_date.text = text;
      entry_for_date.title = title;
      entry_for_date.updateDate = Date.now();
      entry_for_date.save();
      mode = "U";
      new_entry = entry_for_date;
    }

    return res.status(200).json({
      message: "Here is the saved entry",
      entry: new_entry,
      mode: mode,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

module.exports.findByDate = async function (req, res) {
  //function to get the previous entry for the date if it exits
  let date = req.query.date;
  let uid = req.query.user_id;
  console.log(req.query);
  let user = await User.findById(uid);
  let entry_for_date = await Entry.findOne({ createDate: date });
  if (!entry_for_date) {
    return res.status(200).json({
      exists: 0,
    });
  } else {
    return res.status(200).json({
      exists: 1,
      entry: entry_for_date,
    });
  }
};
