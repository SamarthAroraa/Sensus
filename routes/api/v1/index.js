const express = require("express");
const router = express.Router();

router.use('/entries', require('./entries'));


module.exports= router;