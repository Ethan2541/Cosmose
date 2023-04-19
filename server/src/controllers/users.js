const cloudinary = require('../utils/cloudinary');
const db = require('../utils/db');


// Get a user
exports.getUser = (req, res, next) => {
    db.collection('users').findOne({ login: req.params.login })
        .then(user => {
            res.status(200).json({ user: user ? { login: user.login, firstName: user.firstName, lastName: user.lastName, theme: user.theme } : null });
        })
        .catch(err => res.status(500).json({ error: 'Could not find the user' }));
}


// Change user's theme
exports.changeDefaultTheme = (req, res, next) => {
    if (req.user) {
        db.collection('users').updateOne({ login: req.user.login }, { $set: { theme: req.body.theme } })
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'User not found' });
            }
            res.status(204).json();
        })
        .catch(err => res.status(500).json({ error: 'Could not change the stored theme' }));
    }
}


// Get user's assets
exports.getAssets = (req, res, next) => {
    db.collection('users').findOne({ login: req.params.login })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found');
            }
            res.status(200).json({ avatar: user.avatar, cover: user.cover });
        })
        .catch(err => res.status(500).json({ error: 'Could not get the assets' }));
}


// Upload assets
exports.postAssets = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path)
        .then(result => {
            res.status(200).json({ newUrl: result.secure_url, newId: result.public_id })
        })
        .catch(err => res.status(500).json({ error: 'Could not post the assets' }));
}


// Change user's banner ; If invalid -> delete the new assets and keep the old assets ; If valid -> delete the old assets
exports.changeBanner = (req, res, next) => {
    // The user must exist
    db.collection('users').findOne({ login: req.query.login })
        .then(user => {
            if (!user) {
                cloudinary.uploader.destroy(req.query.id)
                    .then(result => res.status(404).json({ error: 'User not found' }))
                    .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
            }
            // Update banner
            const oldId = user.coverId;
            db.collection('users').updateOne({ login: req.query.login }, { $set: { cover: req.query.url, coverId: req.query.id } })
                .then(valid => {
                    if (!valid) {
                        cloudinary.uploader.destroy(req.query.id)
                            .then(result => res.status(400).json({ error: 'Could not update the cover' }))
                            .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
                    }
                    cloudinary.uploader.destroy(oldId)
                        .then(result => res.status(204).json())
                        .catch(error => res.status(500).json({ error: 'Old assets could not be deleted' }));    
                })
                .catch(err => {
                    cloudinary.uploader.destroy(req.query.id)
                        .then(result => res.status(500).json({ error: 'Could not update the cover' }))
                        .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
                });
        })
        .catch(err => {
            cloudinary.uploader.destroy(req.query.id)
                .then(result => res.status(500).json({ error: 'Could not find the user' }))
                .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
        });
}


// Change user's avatar ; If invalid -> delete the new assets and keep the old assets ; If valid -> delete the old assets
exports.changeAvatar = (req, res, next) => {
    // The user must exist
    db.collection('users').findOne({ login: req.query.login })
        .then(user => {
            if (!user) {
                cloudinary.uploader.destroy(req.query.id)
                    .then(result => res.status(404).json({ error: 'User not found' }))
                    .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
            }
            // Update avatar
            const oldId = user.avatarId;
            db.collection('users').updateOne({ login: req.query.login }, { $set: { avatar: req.query.url, avatarId: req.query.id } })
                .then(valid => {
                    if (!valid) {
                        cloudinary.uploader.destroy(req.query.id)
                            .then(result => res.status(400).json({ error: 'Could not update the avatar' }))
                            .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
                    }
                    // Update messages' avatars
                    db.collection('messages').updateMany({ author: req.query.login }, { $set: { avatar: req.query.url }})
                        .then(valid => {
                            if (!valid) {
                                cloudinary.uploader.destroy(req.query.id)
                                    .then(result => res.status(400).json({ error: 'Could not update the avatar' }))
                                    .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
                            }
                            cloudinary.uploader.destroy(oldId)
                                .then(result => res.status(204).json())
                                .catch(error => res.status(500).json({ error: 'Old assets could not be deleted' }));                            
                        })
                        .catch(err => {
                            cloudinary.uploader.destroy(req.query.id)
                                .then(result => res.status(500).json({ error: err }))
                                .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
                        })
                })
                .catch(err => {
                    cloudinary.uploader.destroy(req.query.id)
                        .then(result => res.status(500).json({ error: 'Could not update the avatar' }))
                        .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
                });
        })
        .catch(err => {
            cloudinary.uploader.destroy(req.query.id)
                .then(result => res.status(500).json({ error: 'Could not find the user' }))
                .catch(error => res.status(500).json({ error: 'Could not delete the new assets' }));
        });
}


// Get user's meters
exports.getMeters = (req, res, next) => {
    // Collect data : number of messages, number of likes that the user got, number of followers
    const userMeters = { followers: 0, likes: 0, messages: 0 };
    // Likes and messages
    db.collection('messages').find({ author: { $eq: req.params.login } }).toArray()
        .then(messagesList => {
            for (let i = 0; i < messagesList.length; i++) {
                userMeters.likes += messagesList[i].likes;
                userMeters.messages += 1;
            }
            // Followers
            db.collection('followers').find({ followedLogin: { $eq: req.params.login } }).toArray()
                .then(followersList => {
                    for (let i = 0; i < followersList.length; i++) {
                        userMeters.followers += 1;
                    }
                    res.status(200).json({ userMeters: userMeters });
                })
                .catch(err => res.status(500).json({ error: 'Could not find the followers' }));            
        })
        .catch(err => res.status(500).json({ error: 'Could not find the messages' }));
}


// Get messages liked by the user
exports.getUserLikesList = (req, res, next) => {
    db.collection('likes').find({ userLogin: req.params.login }).toArray()
        .then(likesList => {
            res.status(200).json({ likesList: likesList });
        })
        .catch(err => res.status(500).json({ error: 'Could not find the likes of the user' }))
}