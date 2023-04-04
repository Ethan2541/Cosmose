const auth = require('./../auth.js');
const express = require('express');
const searchCtrl = require('../controllers/search.js');
const router = express.Router();

router.get('/allmessages', auth, searchCtrl.getFilteredMessagesList)

module.exports = router;