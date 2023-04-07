const db = require('../db');

exports.getFilteredMessagesList = (req, res, next) => {
    db.collection('messages').find({ $or: [ { author: { $regex: req.query.filters } }, { message: { $regex: req.query.filters } }] }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getFilteredUserMessagesList = (req, res, next) => {
    db.collection('messages').find({ $and: [ { author: { $eq: req.query.userLogin } }, { message: { $regex: req.query.filters } }] }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getFilteredUser = (req, res, next) => {
    db.collection('users').findOne({ login: req.params.login })
        .then(user => {
            res.status(200).json({ filteredUserLogin: user ? user.login : null });
        })
        .catch(err => res.status(500).json({ error: err }));
}