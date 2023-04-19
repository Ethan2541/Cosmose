const db = require('../utils/db');

exports.isUserAuthorizedLike = async (req, res, next) => {
    const messageId = req.body.messageId;
    const userId = req.user._id;
  
    const messagesCollection = db.collection('messages');
  
    const message = await messagesCollection.findOne({
         _id: messageId, 
         'like.userId': userId
    });

    if (message) {
        const like = message.commentaires.find((like) => like._id === likeId);
        if (!like){
            res.status(404).json({ message: 'Commentaire non trouvé' });
            return;
        }
        if (like.userId !== userId) {
            res.status(403).json({ message: 'Accès non autorisé' });
            return;
        }
    } else {
        res.status(404).json({ message: 'Message non trouvé' });
        return;
    }
  
    next();
};

exports.addLike = (req, res, next) => {
    db.collection('likes').insertOne(
        {
            userLogin: req.body.userLogin,
            messageId: new mongo.ObjectId(req.body.messageId),
            date: new Date()
        })
        .then(valid => {
            if (!valid) {
                return res.status(400).json({ error: 'Could not like' })
            }
            db.collection('messages').updateOne({ _id: new mongo.ObjectId(req.body.messageId) }, { $inc: { likes: 1 } })
                .then(result => {
                    if (!result) {
                        return res.status(400).json({ error: 'Could not increase the number of likes' })
                    }
                    res.status(204).json();
                })
                .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.deleteLike = async (userId, messageId) => {
    db.collection('likes').deleteOne({ userLogin: req.body.userLogin, messageId: req.body.messageId })
        .then(valid => {
            if (!valid) {
                return res.status(400).json({ error: 'Could not unlike' })
            }
            db.collection('messages').updateOne({ _id: new mongo.ObjectId(req.body.messageId) }, { $inc: { likes: -1 } })
                .then(result => {
                    if (!result) {
                        return res.status(400).json({ error: 'Could not decrease the number of likes' })
                    }
                    res.status(204).json();
                })
                .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: err }));
}