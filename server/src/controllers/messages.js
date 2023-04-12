const db = require('./../db');
const mongo = require('mongodb')

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

                db.collection('messages').insertOne({
                    author: user.login,
                    avatar: user.avatar,
                    date: new Date(),
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

exports.deleteMessage = (req, res, next) => {
    db.collection('messages').findOne({ _id: new mongo.ObjectId(req.query.messageId) })
        .then(message => {
            if (!message) {
                return res.status(400).json({ error: 'Message does not exist' });
            }
            if (req.query.currentUserLogin !== message.author) {
                return res.status(403).json({ error: 'Current user does not match the author of the message' });
            }
            db.collection('messages').deleteOne({ _id: new mongo.ObjectId(req.query.messageId) })
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Could not delete the message' });
                    }
                    res.status(204).json();
                })
                .catch(err => res.status(500).json({ error: err }));
        })
}

exports.getMessagesList = (req, res, next) => {
    db.collection('messages').find().limit(Number(req.params.limit)).sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log(err))
}

exports.getUserMessagesList = (req, res, next) => {
    db.collection('messages').find({ author: req.params.userLogin }).limit(Number(req.params.limit)).sort({ date: -1 }).toArray()
        .then(messagesList => {
            res.status(200).json({ messagesList: messagesList });
        })
        .catch(err => console.log(err))
}