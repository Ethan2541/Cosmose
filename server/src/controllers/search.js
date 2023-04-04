const db = require('../db');

exports.getFilteredMessagesList = (req, res, next) => {
    db.collection('messages').find({ $or: [ { author: { $regex: req.query.filters } }, { message: { $regex: req.query.filters } }] }).toArray()
        .then(messagesList => {
            res.status(200).json({ updatedMessagesList: messagesList });
        })
        .catch(err => res.status(500).json({ error: 'Request failed' }));
}