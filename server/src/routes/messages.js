const auth = require("../auth");
const db = require("../db");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const isUserAuthorizedMessage = async (req, res, next) => {
    const messageId = req.body.messageId;
    const userId = req.user._id;
  
    const messagesCollection = db.collection('messages');
  
    const message = await messagesCollection.findOne({ _id: messageId });
  
    if (!message) {
      res.status(404).json({ message: 'Message non trouvé' });
      return;
    }
  
    if (message.userId !== userId) {
      res.status(403).json({ message: 'Accès non autorisé' });
      return;
    }
  
    next();
};

const isUserAuthorizedComment = async (req, res, next) => {
    const messageId = req.body.messageId;
    const commentId = req.body.commentId;
    const userId = req.user._id;
  
    const messagesCollection = db.collection('messages');
  
    const message = await messagesCollection.findOne({
         _id: messageId, 
         "commentaires._id": commentId 
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

const isUserAuthorizedLike = async (req, res, next) => {
    const messageId = req.body.messageId;
    const userId = req.user._id;
  
    const messagesCollection = db.collection('messages');
  
    const message = await messagesCollection.findOne({
         _id: messageId, 
         "like.userId": userId
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

const createMessage = async (userId, message) => {
    await db.collection('messages').insertOne({
        userId: userId,
        message: message,
        date: new Date(),
        likes: [],
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

const router = express.Router();

router.put('/like', async (req, res) => {
    if(req.body.messageId === undefined){
        res.status(400).json({message: "paramètres manquants"});
    }
    else{
        await addLike(req.user.id, req.body.messageId,);
        res.status(201).json({message: "like créé", details: ""});
    }
})
.put('/comment', async (req, res) => {
    if(req.body.messageId === undefined || req.body.comment === undefined){
        res.status(400).json({message: "paramètres manquants"});
    }
    else{
        await addComment(req.user.id, req.body.messageId, req.body.comment);
        res.status(201).json({message: "commentaire créé", details: ""});
    }
})
.put('/', async (req, res) => {
    if(req.body.message === undefined){
        res.status(400).json({message: "paramètres manquants"});
    }
    else{
        await createMessage(req.user.id, req.body.message)
        res.status(201).json({message: "message créé", details: ""});
    }
})
.delete('/like', isUserAuthorizedLike, async (req, res) => {
    if(req.body.messageId === undefined){
        res.status(400).json({message: "paramètres manquants"});
    }
    else{
        await deleteLike(req.user.id, req.body.messageId);
        res.status(201).json({message: "like supprimé", details: ""});
    }
})
.delete('/comment', isUserAuthorizedComment, async (req, res) => {
    if(req.body.messageId === undefined || req.body.commentId === undefined){
        res.status(400).json({message: "paramètres manquants"});
    }
    else{
        await deleteComment(req.body.messageId, req.body.comment);
        res.status(201).json({message: "commentaire supprimé", details: ""});
    }
})
.delete('/', isUserAuthorizedMessage, async (req, res) => {
    if(req.body.messageId === undefined){
        res.status(400).json({message: "paramètres manquants"});
    }
    else{
        await deleteMessage(req.body.messageId);
        res.status(201).json({message: "message supprimé", details: ""});
    }
})

module.exports = router;