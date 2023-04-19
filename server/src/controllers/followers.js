const db = require('../utils/db');


// Follow
exports.follow = (req, res, next) => {
    // Check if the user already follows the other user
    db.collection('followers').findOne({ followerLogin: req.body.followerLogin, followedLogin: req.body.followedLogin })
        .then(exists => {
            if (exists) {
                return res.status(409).json({ error: 'User already followed' })
            }
            // Check if the users exist and get their assets
            db.collection('users').findOne({ login: req.body.followedLogin })
                .then(followedUser => {
                    db.collection('users').findOne({ login: req.body.followerLogin })
                        .then(followerUser => {
                            db.collection('followers').insertOne({
                                followerLogin: req.body.followerLogin,
                                followedLogin: req.body.followedLogin,
                                followedAvatar: followedUser.avatar,
                                followerAvatar: followerUser.avatar,
                                date: new Date()
                            })
                                .then(valid => {
                                    if (!valid) {
                                        return res.status(403).json({ error: 'Unauthorized' });
                                    }
                                    res.status(204).json();
                                })
                                .catch(err => res.status(500).json({ error: 'Could not follow' }));
                        })
                        .catch(err => res.status(500).json({ error: 'Could not find the data of the follower' }));
                })
                .catch(err => res.status(500).json({ error: 'Could not find the data of the followed user' }));
        })
        .catch(err => res.status(500).json({ error: 'Could not check if the user already follows the other user' }))
}


// Unfollow
exports.unfollow = (req, res, next) => {
    // First, the user needs to follow the other user
    db.collection('followers').findOne({ followerLogin: req.query.followerLogin, followedLogin: req.query.followedLogin })
        .then(exists => {
            if (!exists) {
                return res.status(400).json({ error: 'Not followed' })
            }
            // Deletion
            db.collection('followers').deleteOne({ followerLogin: req.query.followerLogin, followedLogin: req.query.followedLogin })
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Could not unfollow' });
                    }
                    res.status(204).json()
                })
                .catch(err => res.status(500).json({ error: 'Could not unfollow' }))
        })
        .catch(err => res.status(500).json({ error: 'Could not check if the user follows the other user' }))
}


// Check if a user follows another user
exports.isFollower = (req, res, next) => {
    db.collection('followers').findOne({ followedLogin: req.params.followedLogin, followerLogin: req.params.followerLogin })
        .then(result => {
            res.status(200).json({ found: result ? true : false });
        })
        .catch(err => res.status(500).json({ error: 'Could not check if the user follows the other user' }))
}


// Get all followers of a given user
exports.getUserFollowersList = (req, res, next) => {
    db.collection('followers').find({ followedLogin: req.params.login }).collation({ locale: 'en' }).sort({ followerLogin: 1 }).toArray()
        .then(followersList => {
            res.status(200).json({ followersList: followersList });
        })
        .catch(err => res.status(500).json({ error: 'Could not get the list of followers' }))
}


// Get all users followed by a given user
exports.getUserFollowedList = (req, res, next) => {
    db.collection('followers').find({ followerLogin: req.params.login }).collation({ locale: 'en' }).sort({ followedLogin: 1 }).toArray()
        .then(followedList => {
            res.status(200).json({ followedList: followedList });
        })
        .catch(err => res.status(500).json({ error: 'Could not get the list of followed users' }));
}