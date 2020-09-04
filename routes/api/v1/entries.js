const express = require("express");
const router = express.Router();
const entriesApi = require('../../../controllers/api/v1/entries_api');

router.get('/', entriesApi.index );


module.exports= router;