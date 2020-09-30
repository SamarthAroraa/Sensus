const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// router.use('/testing', require('./testing'));
router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/app-utils", require("./utils"));
router.use("/forgot-password", require("./forgot_password"));
router.use("/api", require("./api"));

module.exports = router;
