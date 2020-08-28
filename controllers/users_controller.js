const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/user");
const mailer = require('../config/nodemailer');

const addUser = (req, res) => {
  const user = new User({});
};

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Profile",
  });
};

module.exports.signUp = function (req, res) {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const defaultName = req.body.defaulPname ? req.body.firstName : req.body.penName;

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        defaultName:defaultName
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

module.exports.login = function (req, res) {
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user._id,
          fname: user.firstName,
          lname: user.lastName,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
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
            console.log("Error in creating user while signing up!" + err);
            return;
          }

          mailer.sendMail({
            from: "Team Sensus",
            to: req.body.email,
            subject: "Test Email",
            text: "If you are receiving this email, you have successfully signed up for Sensus!"
          });

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
