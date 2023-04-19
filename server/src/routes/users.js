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
.put('/assets/banner', usersCtrl.changeBanner)
.put('/assets/avatar', usersCtrl.changeAvatar)
.get('/stats/:login', usersCtrl.getMeters)
.post('/follow', followersCtrl.follow)
.delete('/follow', followersCtrl.unfollow)
.get('/followers/:login', followersCtrl.getUserFollowersList)
.get('/followed/:login', followersCtrl.getUserFollowedList)
.get('/isfollower/:followerLogin/:followedLogin', followersCtrl.isFollower)
.get('/likes/:login', usersCtrl.getUserLikesList);

module.exports = router;