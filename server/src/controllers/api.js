const bcrypt = require('bcrypt');
const db = require('../utils/db');
const fs = require('fs/promises')
const jwt = require('jsonwebtoken');
const path = require('path');


// Handle logs
async function log(ip, username) {
    const logFilePath = path.join(__dirname, '../../log.txt');

    const currentDate = new Date();

    const date = `${currentDate.getHours()}:${currentDate.getMinutes()} | ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
    const logEntry = `${date} ${ip} ${username}\n`;

    try {
        await fs.appendFile(logFilePath, logEntry);
    } catch (err) {
        console.log('Error when writing in the file: ', err);
    }
}

// Login
exports.login = (req, res, next) => {
    db.collection('users').findOne({ login: req.body.login })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid login or password' });
            }
            // Verify the password
            bcrypt.compare(req.body.password, user.password)
                .then(async valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Invalid login or password' });
                    }

                    // Store IP Address
                    await log(req.ip, req.body.login);

                    // Token payload
                    const payload = {
                        id: user._id,
                        login: user.login,
                    };

                    // Authentication Token
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: req.body.rememberMe ? '30d' : '2h' });

                    res.status(200).json({ 
                        accessToken: token
                    });
                })
                .catch(err => res.status(500).json({ error: 'Could not verify the password' }));
        })
        .catch(err => res.status(500).json({ error: 'Could not look for an existing user' }))
}


// Sign up
exports.signup = (req, res, next) => {
    // The fields must not be empty
    if (!req.body.login || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the user already exists
    db.collection('users').findOne({ login: req.body.login })
        .then(user => {
            if (user) {
                return res.status(401).json({ error: 'User already exists' });
            }
            
            // Hash password
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const newUser = {
                        avatar: '/assets/avatar.jpg',
                        avatarId: null,
                        cover: '/assets/cover.jpg',
                        coverId: null,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        login: req.body.login,
                        password: hash,
                        theme: 'whitedwarf'
                    };

                    // User creation
                    db.collection('users').insertOne(newUser)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'User creation failed' });
                            }
                            
                            res.status(201).json({ message: 'User successfully created' });
                        })
                        .catch(err => res.status(500).json({ error: 'Could not create the user'}))
                })
                .catch(err => res.status(500).json({ error: 'Could not hash the password' }))
        })
        .catch(err => res.status(500).json({ error: 'Could not check if the user already exists' }));
}