const db = require('../utils/db');
const mongo = require('mongodb')

exports.createMessage = (req, res, next) => {
    if (req.user) {
        if (!req.body.message) {
            return res.status(400).json({ error: 'Empty message' });
        }
        
        db.collection('users').findOne({ login: req.user.login })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                db.collection('messages').insertOne({
                    author: user.login,
                    avatar: user.avatar,
                    date: new Date(),
                    likes: 0,
                    message: req.body.message,
                    retweetId: new mongo.ObjectId(req.body.retweetId),
                    retweets: 0
                })
                    .then(valid => {
                        if (!valid) {
                            return res.status(403).json({ error: 'Unauthorized' });
                        }
                        if (req.body.retweetId) {
                            db.collection('messages').updateOne({ _id: new mongo.ObjectId(req.body.retweetId) }, { $inc: { retweets: 1 } })
                                .then(valid => {
                                    if (!valid) {
                                        return res.status(400).json({ error: 'Could not take into account the increase in retweet' })
                                    }
                                    res.status(204).json();
                                })
                                .catch(err => res.status(500).json({ error: err }));
                        }
                        else {
                            res.status(204).json();
                        }
                    })
                    .catch(err => res.status(500).json({ error: err }));
            })
            .catch(err => res.status(500).json({ error: err }));
    }
}

exports.deleteMessage = (req, res, next) => {
    db.collection('messages').findOne({ _id: new mongo.ObjectId(req.query.messageId) })
        .then(message => {
            if (!message) {
                return res.status(400).json({ error: 'Message does not exist' });
            }
            if (req.query.currentUserLogin !== message.author) {
                return res.status(403).json({ error: 'Current user does not match the author of the message' });
            }
            const retweetId = message.retweetId;
            db.collection('messages').deleteOne({ _id: new mongo.ObjectId(req.query.messageId) })
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Could not delete the message' });
                    }
                    db.collection('messages').updateMany({ _id: retweetId }, { $inc: { retweets: -1 } })
                        .then(valid => {
                            if (!valid) {
                                return res.status(400).json({ error: 'Could not take into account the decrease in retweet' })
                            }
                            res.status(204).json();
                        })
                        .catch(err => res.status(500).json({ error: err }));
                    }
                )
                .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getMessagesList = (req, res, next) => {
    db.collection('messages').find().sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log(err))
}

exports.getUserMessagesList = (req, res, next) => {
    db.collection('messages').find({ author: req.params.userLogin }).sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log(err))
}

exports.getMessage = (req, res, next) => {
    db.collection('messages').findOne({ _id: new mongo.ObjectId(req.params.messageId) })
    .then(message => {
        if (!message) {
            return res.status(400).json({ error: 'Message does not exist' });
        }
        res.status(200).json({ message: message })
    })
    .catch(err => res.status(500).json({ error: err }));
}