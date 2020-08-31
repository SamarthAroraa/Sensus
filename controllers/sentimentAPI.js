// Imports the Google Cloud client library
const language = require("@google-cloud/language");

//Color mapping controller
const getColorMapping = require("../config/get-color-mapping").getColorMapping;

// Creates a client
const client = new language.LanguageServiceClient();

// Detects the sentiment of the document
module.exports.analyze = async function (text) {
  try {
    const document = {
      content: String(text),
      type: "PLAIN_TEXT",
      language: "EN",
    };
    const [result] = await client.analyzeSentiment({
      document,
      encodingType: "UTF8",
    });
    const sentiment = result.documentSentiment;
    console.log(result);
    console.log("Document sentiment:");
    console.log(`  Score: ${sentiment.score}`);
    console.log(`  Magnitude: ${sentiment.magnitude}`);
    const sentences = result.sentences;
    const color = getColorMapping(sentiment);
    sentences.forEach((sentence) => {
      console.log(`Sentence: ${sentence.text.content}`);
      console.log(`  Score: ${sentence.sentiment.score}`);
      console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
    });

    return color;
  } catch (err) {
    console.log(err);
    return "#fff";
  }
};
