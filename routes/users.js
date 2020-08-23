const express= require('express');
const router= express.Router();
const passport= require('passport')
const usersController= require('../controllers/users_controller');
const testingController = require("../controllers/testing-controller");
const sentimentAnalyisApi = require("../controllers/sentimentAPI");


router.get('/profile', passport.checkAuthentication, testingController.home );
router.post("/profile/analyze", sentimentAnalyisApi.analyze);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

//use passport as a middleware to authenticate

router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);


// const analzeController = require("../controllers/sentimentAPI");


// router.get("/testing", function (req, res) {

// const analzeController = require("../controllers/sentimentAPI");

// router.get("/profile", function (req, res) {
//   return res.render("./pages/test_home", {
//     layout: "_layout.ejs",
//     title: "Test Home",
//     sentiment: null,
//     final_score: null,
//     text: null,
//   });
// });
// router.post("/analyze", analzeController.analyze);
// });

module.exports= router;