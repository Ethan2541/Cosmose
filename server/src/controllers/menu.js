const db = require('../utils/db');


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
    db.collection('messages').find().sort({ date: -1 }).toArray()
        .then(messagesList => {
            let updatedMessagesList = [];
            for (let i = 0; i < messagesList.length; i++) {
                // Message is from the user
                if (messagesList[i].author === req.params.login) {
                    updatedMessagesList.push(messagesList[i]);
                }
                else {
                    // The user has liked the message
                    db.collection('likes').findOne({ userLogin: req.params.login, messageId: new mongo.ObjectId(messagesList[i]._id) })
                        .then(like => {
                            if (like) {
                                updatedMessagesList.push(messagesList[i])
                            }
                        })
                        .catch(err => res.status(500).json({ error: 'Could not find whether the user has liked the message' }));
                }
            }
            res.status(200).json({ updatedMessagesList: updatedMessagesList });
        })
        .catch(err => res.status(500).json({ error: 'Could not look for the list of messages' }));
}