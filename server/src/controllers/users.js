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
            res.status(204);
        })
        .catch(err => res.status(500).json({ error: err}));
    }
}