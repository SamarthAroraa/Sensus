const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
const ObjectId = require("mongodb").ObjectID;

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
    let entry_for_date = await Entry.findOne({ createDate: date, user: user });

    // console.log(user, "userr");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // let color;
    //to be returned in response
    let new_entry;
    let color = "#fff",
      score = 0,
      magnitude = 0;
    let mode; //Update or create (U or C respectively)
    if (text.length >= 2) {
      console.log("analyzing");

      let get_sentiment = await SentimentApi.analyze(text);

      color = get_sentiment.color;
      score = get_sentiment.score;
      magnitude = get_sentiment.magnitude;
    } else {
      color = "transparent";
      score = 0;
      magnitude = 0;
    }
    console.log(score, magnitude, color);

    let category = "S";
    if ( score <= 0.25 && score >= -0.25) {
      category = "N";
    } else if (category > 0.25) {
      console.log()
      category = "H";
    }
    if (!entry_for_date ) {
      new_entry = await Entry.create({
        title: title,
        user: user,
        text: text,
        mood: color,
        category: category,
        createDate: date,
      });
      mode = "C";
      user.entries.push(new_entry);
      user.save();
    } else {
      entry_for_date.text = text;
      entry_for_date.title = title;
      entry_for_date.mood = color;
      entry_for_date.category = category;
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
// 5f4ba5769fdc69d27fd2725b
module.exports.findByDate = async function (req, res) {
  try {
    //function to get the previous entry for the date if it exits
    let date = req.query.date;
    let uid = ObjectId(req.query.user_id);
    let user = await User.findById(uid);
    let entry_for_date = await Entry.findOne({
      createDate: date,
      user: user,
    });
    // console.log(user, uid);
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
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
