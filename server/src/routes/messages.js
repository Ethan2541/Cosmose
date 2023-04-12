const auth = require('../utils/auth.js');
const express = require('express');
const comments = require('./../controllers/comments');
const likes = require('./../controllers/likes');
const messages = require('./../controllers/messages');

const router = express.Router();

router.get('/:limit', messages.getMessagesList)
.get('/:userLogin/:limit', messages.getUserMessagesList)
.post('/', auth, messages.createMessage)
.delete('/', messages.deleteMessage)

.put('/like', async (req, res) => {
    if(req.body.messageId === undefined){
        res.status(400).json({message: 'paramètres manquants'});
    }
    else{
        await likes.addLike(req.user.id, req.body.messageId,);
        res.status(201).json({message: 'like créé', details: ''});
    }
})
.put('/comment', async (req, res) => {
    if(req.body.messageId === undefined || req.body.comment === undefined){
        res.status(400).json({message: 'paramètres manquants'});
    }
    else{
        await comments.addComment(req.user.id, req.body.messageId, req.body.comment);
        res.status(201).json({message: 'commentaire créé', details: ''});
    }
})
.delete('/like', likes.isUserAuthorizedLike, async (req, res) => {
    if(req.body.messageId === undefined){
        res.status(400).json({message: 'paramètres manquants'});
    }
    else{
        await likes.deleteLike(req.user.id, req.body.messageId);
        res.status(201).json({message: 'like supprimé', details: ''});
    }
})
.delete('/comment', comments.isUserAuthorizedComment, async (req, res) => {
    if(req.body.messageId === undefined || req.body.commentId === undefined){
        res.status(400).json({message: 'paramètres manquants'});
    }
    else{
        await comments.deleteComment(req.body.messageId, req.body.comment);
        res.status(201).json({message: 'commentaire supprimé', details: ''});
    }
})

module.exports = router;