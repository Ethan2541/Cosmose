const db = require("../db");

exports.changeDefaultTheme = (req, res, next) => {
    db.collection("users").updateOne({ login: req.user.login }, { $set: { theme: req.body.theme } })
        .then(res => {
        res.status(200);
        })
        .catch(err => res.status(500).json({ error: err , message: "et non c'est moi"}));
}