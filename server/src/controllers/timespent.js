const db = require("../db");

exports.timeSpent = (req, res, next) => {
    db.collection("users").updateOne({ login: req.user.login }, { $inc: { timespent: req.body.time } })
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: "User not found" });
            }
            res.status(200).json({ message: "Time updated" });
        })
        .catch(err => res.status(500).json({ error: err }));
}