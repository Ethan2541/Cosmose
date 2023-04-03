const db = require("../db");

exports.getCurrentUser = (req, res, next) => {
    db.collection("users").findOne({ login: req.query.login })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }
            const userData = {
                _id: user._id,
                login: user.login,
                firstName: user.firstName,
                lastName: user.lastName,
                theme: user.theme
            }
            res.status(200).json({ user: userData });
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.changeDefaultTheme = (req, res, next) => {
    db.collection("users").updateOne({ login: req.user.login }, { $set: { theme: req.body.theme } })
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: "User not found" });
            }
            res.status(200).json({ message: "Theme updated" });
        })
        .catch(err => res.status(500).json({ error: err}));
}