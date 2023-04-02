const db = require("../db");
const express = require("express");
const hash = require("password-hash");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res, next) => {
    db.collection("users").findOne({ "login": req.body.login })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            if (!hash.verify(req.body.password, user.password)) {
                return res.status(401).json({ error: "Invalid login or password" });
            }

            res.status(200).json({
                "userId": user._id,
                "accessToken": jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "48h" }
                )
            });
        })
        .catch(err => res.status(500).json({ error: "Request failed" }))
})

module.exports = router;