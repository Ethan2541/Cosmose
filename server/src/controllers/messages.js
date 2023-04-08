const db = require('./../db');

exports.isUserAuthorizedMessage = async (req, res, next) => {
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


exports.createMessage = async (userId, message) => {
    await db.collection('messages').insertOne({
        userId: userId,
        message: message,
        date: new Date(),
        likes: [],
        commentaires: []
    });
}

exports.deleteMessage = async (messageId) => {
    await db.collection('messages').deleteOne({
        _id: messageId
    });
}

exports.getMessagesList = (req, res, next) => {
    db.collection('messages').find().limit(Number(req.params.limit)).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log(err))
}