const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

exports.isUserAuthorizedComment = async (req, res, next) => {
    const messageId = req.body.messageId;
    const commentId = req.body.commentId;
    const userId = req.user._id;
  
    const messagesCollection = db.collection('messages');
  
    const message = await messagesCollection.findOne({
         _id: messageId, 
         'commentaires._id': commentId 
    });

    if (message) {
        const comment = message.commentaires.find((comment) => comment._id === commentId);
        if (!comment){
            res.status(404).json({ message: 'Commentaire non trouvé' });
            return;
        }
        if (comment.userId !== userId) {
            res.status(403).json({ message: 'Accès non autorisé' });
            return;
        }
    } else {
        res.status(404).json({ message: 'Message non trouvé' });
        return;
    }
  
    next();
};

exports.addComment = async (userId, messageId, commentaire) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $push: { commentaires: { _id: uuidv4(), userId, commentaire} } }
    );
}

exports.deleteComment = async (messageId, commentId) => {
    await db.collection('messages').updateOne(
        { _id: messageId },
        { $pull: { comments: { _id: commentId } } }
    );
}