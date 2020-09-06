const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
const ObjectId = require("mongodb").ObjectID;

// sort_entry_array_datestring = (entries) => {
//   for (var i=0; i<entries.length; i++){
//     var dateParts = entries[i]["createDate"].split("/");
//     var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
//     entries[i]["createDate"] = dateObject
//   }
//   entries.sort(function(a,b){
//     return (new Date(b.createDate) - new Date(a.createDate));
//   });
//   for (var i=0; i<entries.length; i++){
//     entries[i]["createDate"] = new Date(entries[i]["createDate"]).toLocaleDateString();
//   }
//   return entries;
// }

// change_createdAt_using_createDate = (entry) => {

//   let newDate = new Date(entry.createDate);
//   entry.createdAt = newDate;

//   entry.save();

//   return entry;
// }

module.exports.updateDate = async function (req, res) {
  try {
    let entries = await Entry.find({}, (err) => {
      if (err) {
        console.log(err);
      }
    });

    entries.forEach((element) => {
      element.createdAt = new Date(element.createDate);

      element.save();
    });

    return res.status(200).json({ message: "Done", updatedEntries: entries });
  } catch (err) {
    return res.status(500).json({ messgae: err });
  }
};

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
        // user_entries = sort_entry_array_datestring(docs);
        // user_entries.forEach((element, index) => {
        //   user_entries[index] = change_createdAt_using_createDate(element);
        // });
        console.log(docs);
        return res.status(200).json(docs);
      });
  } catch (err) {
    // console.log(req.body);
    return res.status(500).json(err);
  }
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
    let entry_for_date = await Entry.findOne({
      createDate: date,
      user: user._id,
    });

    // console.log(user, "userr");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //invalid input if entry empty
    if (text.length == 0) {
      return res.status(400).json({
        message: "empty text field",
      });
    }

    // let color;
    //to be returned in response
    let new_entry;
    let color = "transparent",
      score = 0,
      magnitude = 0;
    let mode; //Update or create (U or C respectively)
    if (text.length >= 4) {
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
    console.log(typeof score, typeof 0.25, magnitude, color);

    let category = "S";
    if (score <= 0.25 && score >= -0.25) {
      category = "N";
    } else if (score > 0.25) {
      category = "H";
    }
    if (!entry_for_date) {
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

module.exports.delete = async function (req, res) {
  try {
    let entryId = ObjectId(req.body.entryId);
    let userId = ObjectId(req.body.userId);

    await Entry.findByIdAndDelete(entryId, async (err) => {
      if (err) {
        console.log(err);
      } else {
        let current = await User.findById(userId);
        console.log(current);

        current.entries.pull(entryId);

        current.save();
      }
    });
    return res.status(200).json({ message: "deleted entry" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
