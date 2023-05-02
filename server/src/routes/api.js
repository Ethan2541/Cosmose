const apiCtrl = require('../controllers/api.js');
const auth = require('../utils/auth.js');
const express = require('express');
const messages = require('./messages.js');
const router = express.Router();

router.post('/login', apiCtrl.login)
.post('/signup', apiCtrl.signup)

module.exports = router;