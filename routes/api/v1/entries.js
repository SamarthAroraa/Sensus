const express = require("express");
const router = express.Router();
const entriesApi = require("../../../controllers/api/v1/entries_api");

router.post("/", entriesApi.index);
router.get("/find", entriesApi.findByDate);
router.post("/create-update", entriesApi.createUpdate);
router.post("/delete", entriesApi.delete);

module.exports = router;
