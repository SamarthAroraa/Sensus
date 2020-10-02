const express = require("express");
const router = express.Router();
const dataContoller = require("../../../controllers/api/v1/data");

//method @POST
//Returns the annual stats of entries of each kind for entire userbase and the current user
router.post("/annual", dataContoller.getAnnualData);
router.post("/total", dataContoller.getTotalData);
router.post("/weekly", dataContoller.getWeeklyData);

module.exports = router;
