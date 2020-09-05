const express = require("express");
const router = express.Router();

router.use('/entries', require('./entries'));
router.use('/data', require('./data'));
// router.use('/user-entries', require('./userEntries'));

module.exports= router;