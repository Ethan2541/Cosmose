const db = require('../utils/db');
const mongo = require('mongodb');


// Most liked messages
exports.getMostLiked = (req, res, next) => {
    db.collection('messages').find().sort({ likes: -1, date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: 'Could not look for the list of messages' }));
}


// Most retweeted messages
exports.getMostRetweeted = (req, res, next) => {
    db.collection('messages').find().sort({ retweets: -1, date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: 'Could not look for the list of messages' }));
}


// Messages from the user and messages liked by the user
exports.getAuthorAndLiked = (req, res, next) => {
    // Messages liked by the user
    db.collection('likes').find({ userLogin: req.params.login }).toArray()
        .then(likedMessages => {
            const likedMessagesIds = [];
            for (let i = 0; i < likedMessages.length; i++) {
                likedMessagesIds.push(likedMessages[i].messageId);
            }
            // Messages from the user or liked by the user
            db.collection('messages').find({ $or: [{ author: req.params.login }, { _id: { $in: likedMessagesIds } }] }).sort({ date: -1 }).toArray()
                .then(messagesList => { 
                    res.status(200).json({ updatedMessagesList: messagesList });
                })
                .catch(err => res.status(500).json({ error: 'Could not look for the messages from the user'}))
        })
        .catch(err => res.status(500).json({ error: 'Could not find whether the user has liked the message' }));
}