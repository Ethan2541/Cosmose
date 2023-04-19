const db = require('../utils/db');

exports.getMostLiked = (req, res, next) => {
    db.collection('messages').find().sort({ likes: -1, date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getMostRetweeted = (req, res, next) => {
    db.collection('messages').find().sort({ retweets: -1, date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getAuthorAndLiked = (req, res, next) => {
    db.collection('messages').find().sort({ date: -1 }).toArray()
        .then(messagesList => {
            let updatedMessagesList = [];
            for (let i = 0; i < messagesList.length; i++) {
                if (messagesList[i].author === req.params.login) {
                    updatedMessagesList.push(messagesList[i]);
                }
                else {
                    db.collection('likes').findOne({ userLogin: req.params.login, messageId: new mongo.ObjectId(messagesList[i]._id) })
                        .then(like => {
                            if (like) {
                                updatedMessagesList.push(messagesList[i])
                            }
                        })
                        .catch(err => res.status(500).json({ error: err }));
                }
            }
            res.status(200).json({ updatedMessagesList: updatedMessagesList });
        })
        .catch(err => res.status(500).json({ error: err }));
}