const express = require("express");
const router = express.Router();
const dataContoller = require("../../../controllers/api/v1/data");

//method @GET
//Returns the annual stats of entries of each kind for entire userbase and the current user
router.get("/annual", dataContoller.getAnnualData);
router.get("/total", dataContoller.getTotalData);
router.get("/weekly", dataContoller.getWeeklyData);

module.exports = router;
