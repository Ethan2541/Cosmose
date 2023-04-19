const auth = require('../utils/auth.js');
const express = require('express');
const comments = require('./../controllers/comments');
const likes = require('./../controllers/likes');
const messages = require('./../controllers/messages');

const router = express.Router();

router.get('/', messages.getMessagesList)
.get('/id/:messageId', messages.getMessage)
.get('/:userLogin', messages.getUserMessagesList)
.post('/', auth, messages.createMessage)
.delete('/', messages.deleteMessage);

module.exports = router;