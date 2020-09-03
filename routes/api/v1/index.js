const express = require("express");
const router = express.Router();

router.use('/entries', require('./entries'));
router.use('/data', require('./data'))

module.exports= router;