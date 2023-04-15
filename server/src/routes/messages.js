const auth = require('../utils/auth.js');
const express = require('express');
const comments = require('./../controllers/comments');
const likes = require('./../controllers/likes');
const messages = require('./../controllers/messages');

const router = express.Router();

router.get('/:limit', messages.getMessagesList)
.get('/:userLogin/:limit', messages.getUserMessagesList)
.post('/', auth, messages.createMessage)
.delete('/', messages.deleteMessage);

module.exports = router;