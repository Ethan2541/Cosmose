const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    db.collection("users").findOne({ "login": req.body.login })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Invalid login or password" });
            }
            
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Invalid login or password" });
                    }

                    const payload = {
                        id: user._id, // ID de l'utilisateur
                        login: user.login, // Nom d'utilisateur
                    };

                    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: req.body.rememberMe ? "30d" : "2h" });

                    res.status(200).json({  
                                            accessToken: token
                                        });
                })
                .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: "Request failed" }))
}

exports.signin = (req, res, next) => {
    if (!req.body.login || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    db.collection("users").findOne({ login: req.body.login })
        .then(user => {
            if (user) {
                return res.status(401).json({ error: "User already exists" });
            }
            
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const newUser = {
                        login: req.body.login,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: hash
                    };

                    db.collection("users").insertOne(newUser)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: "User creation failed" });
                            }
                            
                            res.status(201).json({ message: "User successfully created" });
                        })
                        .catch(err => res.status(500).json({ error: err }))
                })
                .catch(err => res.status(500).json({ error: err }))
        })
        .catch(err => res.status(500).json({ error: err }));
}