module.exports.home = function (req, res) {
  return res.render("./pages/test_home", {
    layout: "layout.ejs",
    title: "Test Home",
    sentiment: null,
    final_score: null,
    text: null,
    color: null,
  });
};

