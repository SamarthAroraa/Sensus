const express = require("express");
const router = express.Router();

const utilsController = require("../controllers/utils");

router.get("/daily-prompts", utilsController.dailyPrompts);

module.exports = router;
