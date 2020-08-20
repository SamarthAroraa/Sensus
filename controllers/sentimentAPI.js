// Imports the Google Cloud client library
const language = require("@google-cloud/language");

// Creates a client
const client = new language.LanguageServiceClient();

// Detects the sentiment of the document
module.exports.analyze = async function (req, res) {
  const text = req.body.text;
  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };
  const [result] = await client.analyzeSentiment({ document });

  const sentiment = result.documentSentiment;
  console.log("Document sentiment:");
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  sentences.forEach((sentence) => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  });
  const final_score = sentiment.score * sentiment.magnitude;
  return res.render("./pages/test_home", {
    layout: "_layout.ejs",
    title: "Test Home",
    sentiment: sentiment,
    final_score: final_score,
    text: text,
  });
};
