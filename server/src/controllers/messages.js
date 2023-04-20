const cloudinary = require('../utils/cloudinary');
const db = require('../utils/db');
const mongo = require('mongodb');


// Create message
exports.createMessage = (req, res, next) => {
    if (req.user) {
        if (!req.body.message) {
            return res.status(400).json({ error: 'Empty message' });
        }
        // Check if the user exists
        db.collection('users').findOne({ login: req.user.login })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                // Insert the new message
                db.collection('messages').insertOne({
                    author: user.login,
                    avatar: user.avatar,
                    date: new Date(),
                    image: req.body.image,
                    imageId: req.body.imageId,
                    likes: 0,
                    message: req.body.message,
                    retweetId: req.body.retweetId ? new mongo.ObjectId(req.body.retweetId) : null,
                    retweets: 0
                })
                    .then(valid => {
                        if (!valid) {
                            return res.status(403).json({ error: 'Unauthorized' });
                        }
                        // Link with the retweeted message if necessary
                        if (req.body.retweetId) {
                            db.collection('messages').updateOne({ _id: new mongo.ObjectId(req.body.retweetId) }, { $inc: { retweets: 1 } })
                                .then(valid => {
                                    if (!valid) {
                                        return res.status(400).json({ error: 'Could not take into account the increase in retweet' })
                                    }
                                    res.status(204).json();
                                })
                                .catch(err => res.status(500).json({ error: 'Could not properly update the retweeted messages' }));
                        }
                        else {
                            res.status(204).json();
                        }
                    })
                    .catch(err => res.status(500).json({ error: 'Could not create the message' }));
            })
            .catch(err => res.status(500).json({ error: 'Could not check if the user exists' }));
    }
}


// Message deletion
exports.deleteMessage = (req, res, next) => {
    // The message must exist
    db.collection('messages').findOne({ _id: new mongo.ObjectId(req.query.messageId) })
        .then(message => {
            if (!message) {
                return res.status(400).json({ error: 'Message does not exist' });
            }
            if (req.query.currentUserLogin !== message.author) {
                return res.status(403).json({ error: 'Current user does not match the author of the message' });
            }
            // Message deletion
            const messageId = message._id;
            const messageImageId = message.imageId;
            const retweetId = message.retweetId;
            db.collection('messages').deleteOne({ _id: new mongo.ObjectId(req.query.messageId) })
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Could not delete the message' });
                    }
                    // Decrease the retweets
                    db.collection('messages').updateMany({ _id: retweetId }, { $inc: { retweets: -1 } })
                        .then(valid => {
                            if (!valid) {
                                return res.status(400).json({ error: 'Could not take into account the decrease in retweet' })
                            }
                            // Delete the likes
                            db.collection('likes').deleteMany({ messageId: messageId })
                                .then(valid => {
                                    if (!valid) {
                                        return res.status(400).json({ error: 'Failed to delete the related likes' })
                                    }
                                    // Delete the image if necessary
                                    if (messageImageId) {
                                        cloudinary.uploader.destroy(messageImageId)
                                            .then(result => res.status(204).json())
                                            .catch(error => res.status(500).json({ error: 'Could not delete the image' }));
                                    }
                                    else {
                                        res.status(204).json();
                                    }
                                })
                                .catch('Could not properly remove the related likes')
                        })
                        .catch(err => res.status(500).json({ error: 'Could not properly update the retweeted messages' }));
                    }
                )
                .catch(err => res.status(500).json({ error: 'Could not delete the message' }));
        })
        .catch(err => res.status(500).json({ error: 'Could not check if the message exists' }));
}


// Get list of messages
exports.getMessagesList = (req, res, next) => {
    db.collection('messages').find().sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log('Could not fetch the list of messages'))
}


// Get list of messages from the user
exports.getUserMessagesList = (req, res, next) => {
    db.collection('messages').find({ author: req.params.userLogin }).sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log('Could not fetch the list of messages from the user'))
}


// Get a specific message
exports.getMessage = (req, res, next) => {
    db.collection('messages').findOne({ _id: new mongo.ObjectId(req.params.messageId) })
    .then(message => {
        res.status(200).json({ message: message })
    })
    .catch(err => res.status(500).json({ error: 'Could not find the message' }));
}