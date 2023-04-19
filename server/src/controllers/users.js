const cloudinary = require('../utils/cloudinary');
const db = require('../utils/db');

exports.getUser = (req, res, next) => {
    db.collection('users').findOne({ login: req.params.login })
        .then(user => {
            res.status(200).json({ user: user ? { login: user.login, firstName: user.firstName, lastName: user.lastName, theme: user.theme } : null });
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.changeDefaultTheme = (req, res, next) => {
    if (req.user) {
        db.collection('users').updateOne({ login: req.user.login }, { $set: { theme: req.body.theme } })
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'User not found' });
            }
            res.status(204).json();
        })
        .catch(err => res.status(500).json({ error: err }));
    }
}

exports.getAssets = (req, res, next) => {
    db.collection('users').findOne({ login: req.params.login })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found');
            }
            res.status(200).json({ avatar: user.avatar, cover: user.cover });
        })
        .catch(err => res.status(500).json('Internal server error'));
}

exports.postAssets = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path)
        .then(result => {
            res.status(200).json({ newUrl: result.secure_url, newId: result.public_id })
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.changeBanner = (req, res, next) => {
    db.collection('users').findOne({ login: req.query.login })
        .then(user => {
            if (!user) {
                cloudinary.uploader.destroy(req.query.id)
                    .then(result => res.status(404).json({ error: 'User not found' }))
                    .catch(error => res.status(500).json({ error: error }));
            }
            const oldId = user.coverId;
            db.collection('users').updateOne({ login: req.query.login }, { $set: { cover: req.query.url, coverId: req.query.id } })
                .then(valid => {
                    if (!valid) {
                        cloudinary.uploader.destroy(req.query.id)
                            .then(result => res.status(400).json({ error: 'Could not update the cover' }))
                            .catch(error => res.status(500).json({ error: error }));
                    }
                    cloudinary.uploader.destroy(oldId)
                        .then(result => res.status(204).json())
                        .catch(error => res.status(500).json({ error: 'Image could not be deleted' }));    
                })
                .catch(err => {
                    cloudinary.uploader.destroy(req.query.id)
                        .then(result => res.status(500).json({ error: err }))
                        .catch(error => res.status(500).json({ error: error }));
                });
        })
        .catch(err => {
            cloudinary.uploader.destroy(req.query.id)
                .then(result => res.status(500).json({ error: err }))
                .catch(error => res.status(500).json({ error: error }));
        });
}

exports.changeAvatar = (req, res, next) => {
    db.collection('users').findOne({ login: req.query.login })
        .then(user => {
            if (!user) {
                cloudinary.uploader.destroy(req.query.id)
                    .then(result => res.status(404).json({ error: 'User not found' }))
                    .catch(error => res.status(500).json({ error: error }));
            }
            const oldId = user.avatarId;
            db.collection('users').updateOne({ login: req.query.login }, { $set: { avatar: req.query.url, avatarId: req.query.id } })
                .then(valid => {
                    if (!valid) {
                        cloudinary.uploader.destroy(req.query.id)
                            .then(result => res.status(400).json({ error: 'Could not update the avatar' }))
                            .catch(error => res.status(500).json({ error: error }));
                    }
                    db.collection('messages').updateMany({ author: req.query.login }, { $set: { avatar: req.query.url }})
                        .then(valid => {
                            if (!valid) {
                                cloudinary.uploader.destroy(req.query.id)
                                    .then(result => res.status(400).json({ error: 'Could not update the avatar' }))
                                    .catch(error => res.status(500).json({ error: error }));
                            }
                            cloudinary.uploader.destroy(oldId)
                                .then(result => res.status(204).json())
                                .catch(error => res.status(500).json({ error: 'Image could not be deleted' }));                            
                        })
                        .catch(err => {
                            cloudinary.uploader.destroy(req.query.id)
                                .then(result => res.status(500).json({ error: err }))
                                .catch(error => res.status(500).json({ error: error }));
                        })
                })
                .catch(err => {
                    cloudinary.uploader.destroy(req.query.id)
                        .then(result => res.status(500).json({ error: err }))
                        .catch(error => res.status(500).json({ error: error }));
                });
        })
        .catch(err => {
            cloudinary.uploader.destroy(req.query.id)
                .then(result => res.status(500).json({ error: err }))
                .catch(error => res.status(500).json({ error: error }));
        });
}

exports.getMeters = (req, res, next) => {
    const userMeters = { followers: 0, likes: 0, messages: 0 };
    db.collection('messages').find({ author: { $eq: req.params.login } }).toArray()
        .then(messagesList => {
            for (let i = 0; i < messagesList.length; i++) {
                userMeters.likes += messagesList[i].likes;
                userMeters.messages += 1;
            }
            
            db.collection('followers').find({ followedLogin: { $eq: req.params.login } }).toArray()
                .then(followersList => {
                    for (let i = 0; i < followersList.length; i++) {
                        userMeters.followers += 1;
                    }
                    res.status(200).json({ userMeters: userMeters });
                })
                .catch(err => res.status(500).json({ error: 'Internal server error' }));            
        })
        .catch(err => res.status(500).json({ error: 'Internal server error' }));
}