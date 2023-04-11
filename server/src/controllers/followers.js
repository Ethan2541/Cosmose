const bcrypt = require('bcrypt');
const db = require('../db');

exports.getUserFollowersList = (req, res, next) => {
    db.collection('followers').find({ followedLogin: req.body.login }).limit(Number(req.params.limit)).toArray()
        .then(followersList => {
            res.status(200).json({ followersList: followersList });
        })
        .catch(err => res.status(500).json({ error: err }))
}

exports.getUserFollowedList = (req, res, next) => {
    db.collection('followers').find({ followerLogin: req.params.login }).limit(Number(req.params.limit)).toArray()
        .then(followedList => {
            res.status(200).json({ followedList: followedList });
        })
        .catch(err => res.status(500).json({ error: err }));
}