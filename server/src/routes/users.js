const auth = require('../utils/auth.js');
const express = require('express');
const followersCtrl = require('../controllers/followers.js');
const router = express.Router();
const upload = require('../utils/multer.js');
const usersCtrl = require('../controllers/users.js');

router.get('/:login', usersCtrl.getUser)
.put('/theme', auth, usersCtrl.changeDefaultTheme)
.get('/assets/:login', usersCtrl.getAssets)
.post('/assets', upload.single('image'), usersCtrl.postAssets)
.get('/stats/:login', usersCtrl.getMeters)
.post('/follow', followersCtrl.follow)
.delete('/follow', followersCtrl.unfollow)
.get('/followers/:login/:limit', followersCtrl.getUserFollowersList)
.get('/followed/:login/:limit', followersCtrl.getUserFollowedList)
.get('/isfollower/:followerLogin/:followedLogin', followersCtrl.isFollower);

module.exports = router;