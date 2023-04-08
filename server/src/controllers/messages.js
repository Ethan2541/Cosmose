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


exports.createMessage = (req, res, next) => {
    if (req.user) {
        if (!req.body.message) {
            return res.status(400).json({ error: 'Empty message' });
        }
        
        db.collection('users').findOne({ login: req.user.login })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                const currentDate = new Date();

                db.collection('messages').insertOne({
                    author: user.login,
                    avatar: user.avatar,
                    date: `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} à ${currentDate.getHours()}h${currentDate.getMinutes()}`,
                    likes: 0,
                    message: req.body.message
                })
                    .then(valid => {
                        if (!valid) {
                            return res.status(403).json({ error: 'Unauthorized' });
                        }
                        res.status(204).json();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
}

exports.deleteMessage = async (messageId) => {
    await db.collection('messages').deleteOne({
        _id: messageId
    });
}

exports.getMessagesList = (req, res, next) => {
    db.collection('messages').find().limit(Number(req.params.limit)).sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log(err))
}