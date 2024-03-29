const api = require('./routes/api.js');
const assets = require('./routes/assets.js');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const menu = require('./routes/menu.js');
const messages = require('./routes/messages.js');
const path = require('path');
const search = require('./routes/search.js');
const users = require('./routes/users.js');

const allowedOrigins = [
    'http://cosmose.me',
    'https://cosmose.me',
    'http://www.cosmose.me',
    'https://www.cosmose.me',
    'http://10-gag.fr',
    'https://10-gag.fr',
    'http://www.10-gag.fr',
    'https://www.10-gag.fr',
];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true
};

const app = express();
app.use((req, res, next) => {
    if (req.protocol === 'http') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
})
.use(cors(corsOptions))
.use(express.json())
.use(express.static(path.join(__dirname, '../../client/build')))
.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use('/api', api)
.use('/assets', assets)
.use('/menu', menu)
.use('/search', search)
.use('/users', users)
.use('/messages', messages);

app.use('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const httpServer = http.createServer(app);

const privateKey = fs.readFileSync('/etc/letsencrypt/live/cosmose.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/cosmose.me/fullchain.pem', 'utf8');

const httpsOptions = {
    key: privateKey,
    cert: certificate,
};

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(process.env.PORT,  () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});

httpServer.listen(80, () => {
    console.log('Serveur HTTP en écoute sur le port 80');
});