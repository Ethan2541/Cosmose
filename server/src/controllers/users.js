const db = require('../db');

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

exports.getMeters = (req, res, next) => {
    let meters = { comments: 0, followers: 0, likes: 0 };
}