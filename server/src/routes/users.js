const auth = require('../utils/auth.js');
const express = require('express');
const followersCtrl = require('../controllers/followers.js');
const router = express.Router();
const upload = require('../utils/multer.js');
const usersCtrl = require('../controllers/users.js');

router.get('/:login', usersCtrl.getUser)
.put('/theme', auth, usersCtrl.changeDefaultTheme)

.get('/assets/:login', usersCtrl.getAssets)
.put('/assets/banner', auth, usersCtrl.changeBanner)
.put('/assets/avatar', auth, usersCtrl.changeAvatar)

.get('/stats/:login', usersCtrl.getMeters)

.post('/follow', auth, followersCtrl.follow)
.delete('/follow', auth, followersCtrl.unfollow)
.get('/followers/:login', followersCtrl.getUserFollowersList)
.get('/followed/:login', followersCtrl.getUserFollowedList)
.get('/isfollower/:followerLogin/:followedLogin', followersCtrl.isFollower)

.get('/likes/:login', usersCtrl.getUserLikesList);

module.exports = router;