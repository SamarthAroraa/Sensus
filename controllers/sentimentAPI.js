// Imports the AWS SDK
const AWS = require("aws-sdk");
//Color mapping controller
const getColorMapping = require("../config/get-color-mapping").getColorMapping;

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

// AWS.config.loadFromPath('../config/aws-config.json')

let client;

// Detects the sentiment of the document
module.exports.analyze = async function (text) {
  if (!AWS.config.region) {
    await AWS.config.update({
      region: "us-east-1",
    });
  }
  text = String(text);
  text = text.toLowerCase();
  const params = {
    Text: text,
    LanguageCode: "en",
  };

  //RESPONSE TYPE
  // {
  //   "Sentiment": {
  //       "Sentiment": "MIXED",
  //       "SentimentScore": {
  //           "Positive": 0.00024584023049101233,
  //           "Negative": 0.0009976399596780539,
  //           "Neutral": 0.000012128871276217978,
  //           "Mixed": 0.9987443685531616
  //       }
  //   }
  // }

  comprehend.detectSentiment(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      // console.log(data)
      const result = data;
      let sentiment = result.Sentiment.toLowerCase();
      sentiment = sentiment[0].toUpperCase() + sentiment.slice(1);
      var score = result.SentimentScore[sentiment];

      if (result.Sentiment == "MIXED" || result.Sentiment == "NEUTRAL") {
        score =
          Math.max(result.SentimentScore.Neutral, result.SentimentScore.Mixed) *
          0.3;
        if (result.SentimentScore.Negative > result.SentimentScore.Positive) {
          score *= -1;
        }
      }
      console.log(score);
      const color = getColorMapping({ score, score });

      let brief = {
        color: color,
        score: score,
        magnitude: score,
      };
      console.log(brief);
    } // successful response
  });
  //   const [result] = await client.analyzeSentiment({
  //     document,
  //     encodingType: "UTF8",
  //   });
  //   const sentiment = result.documentSentiment;
  //   console.log("Document sentiment:");
  //   console.log(`  Score: ${sentiment.score}`);
  //   console.log(`  Magnitude: ${sentiment.magnitude}`);
  //   const sentences = result.sentences;
  //   const color = getColorMapping(sentiment);
  //   sentences.forEach((sentence) => {
  //     console.log(`Sentence: ${sentence.text.content}`);
  //     console.log(`  Score: ${sentence.sentiment.score}`);
  //     console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  //   });
  //   let brief = {
  //     color: color,
  //     score: sentiment.score,
  //     magnitude: sentiment.magnitude,
  //   };
  //   return brief;
  // } catch (err) {
  //   console.log(err);
  //   return {
  //     color: "transparent",
  //     score: 0,
  //     magnitude: 0,
  //   };
};
