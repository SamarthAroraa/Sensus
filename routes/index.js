const express = require("express");
const router = express.Router();
const analzeController = require("../controllers/sentimentAPI");

router.get("/", function (req, res) {
  return res.render("./pages/test_home", {
    layout: "_layout.ejs",
    title: "Test Home",
    sentiment: null,
    final_score: null,
    text: null,
  });
});
router.post("/analyze", analzeController.analyze);
module.exports = router;
