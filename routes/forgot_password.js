const express = require("express");
const router = express.Router();
const forgot_password_controller = require("../controllers/forgot_password_controller");

// @route PATCH forgot-password/
// @desc Handle forgot password
// @access Public
router.patch("/", forgot_password_controller.forgotPassword);

module.exports = router;
