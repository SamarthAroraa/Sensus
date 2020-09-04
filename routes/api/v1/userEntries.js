const express = require("express");
const router = express.Router();
const userEntriesApi = require('../../../controllers/api/v1/userEntries_api');

router.get('/', userEntriesApi.index );


module.exports= router;