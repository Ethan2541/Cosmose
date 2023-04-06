const auth = require('./../auth.js');
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');

router.get('/:login', usersCtrl.getUser)
.put('/theme', auth, usersCtrl.changeDefaultTheme)
.get('/assets/:login', usersCtrl.getAssets)
.get('/meters/:login', usersCtrl.getMeters);

module.exports = router;