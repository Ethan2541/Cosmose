const auth = require('../utils/auth.js');
const express = require('express');
const menuCtrl = require('../controllers/menu.js');
const router = express.Router();

router.get('/moststarred', menuCtrl.getMostLiked)
.get('/mostretweeted', menuCtrl.getMostRetweeted)
.get('/authorandliked/:login', menuCtrl.getAuthorAndLiked);
module.exports = router;