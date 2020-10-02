const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const ObjectId = require("mongodb").ObjectID;
const AWS = require("aws-sdk");
//Color mapping controller
const getColorMapping = require("../../../config/get-color-mapping")
  .getColorMapping;

var myCredentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:2946de93-ba02-4baf-ab24-5dcf9c13027f",
});
var myConfig = new AWS.Config({
  credentials: myCredentials,
  region: "us-east-1",
});
AWS.config = myConfig;
// Creates a comprehend instance
var comprehend = new AWS.Comprehend();

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
        
        console.log(docs);
        return res.status(200).json(docs);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createUpdate = async function (req, res) {
  try {
   
    let text = req.body.text;
    let title = req.body.title;
    let date = req.body.date;
    let uid = req.body.user_id;
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
    let mode; //Update or create (U or C respectively)
    console.log("analyzing");
    //Sentiment Analysis Part
    if (!AWS.config.region) {
      await AWS.config.update({
        region: "us-east-1",
      });
    }
    text = String(text);
    saveText = text;
    text = text.toLowerCase();
    const params = {
      Text: text,
      LanguageCode: "en",
    };
    comprehend.detectSentiment(params, async function (err, data) {
      const result = data;
      let sentiment = result.Sentiment.toLowerCase();
      sentiment = sentiment[0].toUpperCase() + sentiment.slice(1);
      var score = result.SentimentScore[sentiment];
      if (result.Sentiment == "MIXED" || result.Sentiment == "NEUTRAL") {
        score =
          Math.max(result.SentimentScore.Neutral, result.SentimentScore.Mixed) *
          0.3;
      }
      if (result.SentimentScore.Negative > result.SentimentScore.Positive) {
        score *= -1;
      }
      console.log(score);
      score = score.toFixed(3);
      console.log(score);
      const color = await getColorMapping({ score: score, magnitude: score });
      
      let category = "S";
      if (score <= 0.3 && score >= -0.4) {
        category = "N";
      } else if (score > 0.3) {
        category = "H";
      }
      if (!entry_for_date) {
        new_entry = await Entry.create({
          title: title,
          user: user,
          text: saveText,
          mood: color,
          category: category,
          createDate: date,
        });
        mode = "C";
        user.entries.push(new_entry);
        user.save();
      } else {
        entry_for_date.text = saveText;
        entry_for_date.title = title;
        entry_for_date.mood = color;
        entry_for_date.category = category;
        entry_for_date.updateDate = Date.now();
        entry_for_date.save();
        mode = "U";
        new_entry = entry_for_date;
      }
      res.status(200).json({ message: "Entry saved!" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

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
