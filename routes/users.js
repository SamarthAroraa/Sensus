const express= require('express');
const router= express.Router();
const passport= require('passport')
const usersController= require('../controllers/users_controller');
const testingController = require("../controllers/testing-controller");
const sentimentAnalyisApi = require("../controllers/sentimentAPI");





// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/sign-up', usersController.signUp);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login" , usersController.login)

// router.get('/profile', passport.checkAuthentication, testingController.home );
// router.post("/profile/analyze", sentimentAnalyisApi.analyze);
// router.post('/create', usersController.create);
//use passport as a middleware to authenticate


router.get('/sign-out', usersController.destroySession);


module.exports= router;