const User = require("../models/user");

const addUser = (req, res) => {
  const user = new User({});
};

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Profile",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Sensus | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Sensus | Sign In",
  });
};

//get the sign up date

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("Error in finding user in signing up!");
        return;
      }

      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("Error in creating user while signing up!");
            return;
          }

          return res.redirect("/users/sign-in");
        });
      } else {
        return res.redirect("back");
      }
    }
  );
};

//Session functions

module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};

//Profile Page Modifications.

module.exports.updateProfile = (req, res) => {
  User.updateOne(
    { username: req.body.username },
    {
      firstName: req.body.fname,
      lastName: req.body.lname,
      penName: req.body.pname,
      usePenNameDefault: req.body.pnamedef,
      about: req.body.abt,
      facebookURL: req.body.fburl,
      twitterURL: req.body.turl,
      instgramURL: req.body.iurl,
      linkedinURL: req.body.liurl,
    }
  );
};
