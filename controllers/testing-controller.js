module.exports.home = function (req, res) {
    return res.render("profile", {
      title: "Profile",
      sentiment: null,
      final_score: null,
      text: null,
      color: null,
    });
  };

