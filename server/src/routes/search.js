const auth = require('./../auth.js');
const express = require('express');
const searchCtrl = require('../controllers/search.js');
const router = express.Router();

router.get('/allmessages', auth, searchCtrl.getFilteredMessagesList)
.get('/usermessages', auth, searchCtrl.getFilteredUserMessagesList)
.get('/users/:login', auth, searchCtrl.getFilteredUser);

module.exports = router;