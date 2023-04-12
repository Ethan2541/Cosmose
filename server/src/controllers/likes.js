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

exports.addLike = async (userId, messageId) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $push: { likes: userId }}
    );
}

exports.deleteLike = async (userId, messageId) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $pull: { likes: userId }}
    );
}