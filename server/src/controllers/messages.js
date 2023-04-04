const auth = require('../auth');
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.isUserAuthorizedMessage = (req, res, next) => {
    const messageId = req.body.messageId;
    const userId = req.user._id;
  
    db.collection('messages').findOne({ _id: messageId })
        .then(message => {
            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }

            if (message.userId !== userId) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }
            next();
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.isUserAuthorizedComment = (req, res, next) => {
    const messageId = req.body.messageId;
    const commentId = req.body.commentId;
    const userId = req.user._id;
  
    db.collection('messages').findOne({ _id: messageId, 'commentaires._id': commentId })
        .then(message => {
            if (!message) {
                return res.status(404).json({ error: 'Message not found'});
            }
            
            const comment = message.commentaires.find((comment) => comment._id === commentId);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            if (comment.userId !== userId) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }
            next();
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.isUserAuthorizedLike = (req, res, next) => {
    const messageId = req.body.messageId;
    const userId = req.user._id;
  
    db.collection('messages').findOne({ _id: messageId, 'like.userId': userId })
        .then(message => {
            if (!message) {
                return res.status(404).json({message: 'Message not found'});
            }

            const like = message.commentaires.find((like) => like._id === likeId);
            if (!like) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            if (like.userId !== userId) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }
            next();
        })
        .catch(err => res.status(500).json({ error: err }));  
};

const createMessage = async (userId, message) => {
    await db.collection('messages').insertOne({
        userId: userId,
        message: message,
        date: new Date(),
        stars: [],
        commentaires: []
    });
}

const deleteMessage = async (messageId) => {
    await db.collection('messages').deleteOne({
        _id: messageId
    });
}

const addLike = async (userId, messageId) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $push: { likes: userId }}
    );
}

const deleteLike = async (userId, messageId) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $pull: { likes: userId }}
    );
}

const addComment = async (userId, messageId, commentaire) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $push: { commentaires: { _id: uuidv4(), userId, commentaire} } }
    );
}

const deleteComment = async (messageId, commentId) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $pull: { comments: { _id: commentId } } }
    );
}