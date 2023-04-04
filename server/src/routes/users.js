const auth = require('./../auth.js');
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');

router.get('/', usersCtrl.getCurrentUser)
.put('/theme', auth, usersCtrl.changeDefaultTheme);

module.exports = router;