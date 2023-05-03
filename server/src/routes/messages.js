const auth = require('../utils/auth.js');
const express = require('express');
const likes = require('./../controllers/likes');
const messages = require('./../controllers/messages');
const router = express.Router();

router.get('/', messages.getMessagesList)
.get('/id/:messageId', messages.getMessage)
.get('/:userLogin', messages.getUserMessagesList)

.post('/', auth, messages.createMessage)
.delete('/', auth, messages.deleteMessage)

.get('/likes/:userLogin/:messageId', likes.getLike)
.post('/likes', auth, likes.addLike)
.delete('/likes', auth, likes.deleteLike);

module.exports = router;