const auth = require('../utils/auth.js');
const express = require('express');
const searchCtrl = require('../controllers/search.js');
const router = express.Router();

router.get('/allmessages', searchCtrl.getFilteredMessagesList)
.get('/usermessages', searchCtrl.getFilteredUserMessagesList)
.get('/users/:login', searchCtrl.getFilteredUser)
.get('/users', searchCtrl.getFilteredUser);

module.exports = router;