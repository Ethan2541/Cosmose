const db = require("../db");

exports.getCurrentUser = (req, res, next) => {
    db.collection("users").findOne(req.body.login)
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }
            const userData = {
                login: user.login,
                firstName: user.firstName,
                lastName: user.lastName,
            }
            res.status(200).json({ user: userData });
        })
        .catch(err => res.status(500).json({ error: err }));
}