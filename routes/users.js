const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users_controller");
const testingController = require("../controllers/testing-controller");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/sign-up", usersController.signUp);

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", usersController.login);

// @route PATCH users/update-profile
// @desc Update profile details of an existing user
// @access Public
router.patch("/update-profile", usersController.updateProfile);

// @route PATCH users/change-password
// @desc Change Password of current user
// @access public

router.patch("/change-password", usersController.changePassword);

router.get("/sign-out", usersController.destroySession);

module.exports = router;
