const db = require('../utils/db');
const mongo = require('mongodb');


// Add like
exports.addLike = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    // Check user has already liked the message
    db.collection('likes').findOne({ userLogin: req.user.login, messageId: new mongo.ObjectId(req.body.messageId) })
        .then(like => {
            if (like) {
                return res.status(400).json({ error: 'Already liked' })
            }
            // Creation
            db.collection('likes').insertOne(
                {
                    userLogin: req.user.login,
                    messageId: new mongo.ObjectId(req.body.messageId),
                    date: new Date()
                })
                .then(valid => {
                    // Invalid insertion
                    if (!valid) {
                        return res.status(400).json({ error: 'Could not like' })
                    }
                    // Increase the message's likes counter
                    db.collection('messages').updateOne({ _id: new mongo.ObjectId(req.body.messageId) }, { $inc: { likes: 1 } })
                        .then(result => {
                            if (!result) {
                                return res.status(400).json({ error: 'Could not increase the number of likes' })
                            }
                            res.status(204).json();
                        })
                        .catch(err => res.status(500).json({ error: 'Could not increase the number of likes' }));
                })
                .catch(err => res.status(500).json({ error: 'Could not like' }));
        })
        .catch(err => res.status(500).json({ error: 'Could not check if user has already liked the message' }))
}


// Delete like
exports.deleteLike = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    db.collection('likes').findOne({ userLogin: req.user.login, messageId: new mongo.ObjectId(req.body.messageId) })
        .then(like => {
            if (!like) {
                return res.status(400).json({ error: 'Not liked' })
            }
            // Deletion
            db.collection('likes').deleteOne({ userLogin: req.user.login, messageId: new mongo.ObjectId(req.body.messageId) })
            .then(valid => {
                // Invalid deletion
                if (!valid) {
                    return res.status(400).json({ error: 'Could not unlike' })
                }
                // Decrease the message's likes counter
                db.collection('messages').updateOne({ _id: new mongo.ObjectId(req.body.messageId) }, { $inc: { likes: -1 } })
                    .then(result => {
                        if (!result) {
                            return res.status(400).json({ error: 'Could not decrease the number of likes' })
                        }
                        res.status(204).json();
                    })
                    .catch(err => res.status(500).json({ error: 'Could not decrease the number of likes' }));
            })
            .catch(err => res.status(500).json({ error: 'Could not unlike' }));
        })
        .catch(err => res.status(500).json({ error: 'Could not check if user has liked the message' }))
}


// Check whether the user has liked a message
exports.getLike = (req, res, next) => {
    db.collection('likes').findOne({ userLogin: req.params.userLogin, messageId: new mongo.ObjectId(req.params.messageId) })
        .then(like => {
            res.status(200).json({ like: like })
        })
        .catch(err => res.status(500).json({ error: 'Could not check if the user liked the message' }));
}