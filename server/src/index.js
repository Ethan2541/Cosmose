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

const corsOptions = {
    origin: 'https://cosmose.me',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};

const app = express();
/*app.use((req, res, next) => {
    if (req.protocol === 'http') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
})*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://local:8001');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
    'Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    if ('OPTIONS' === req.method) {
    res.sendStatus(200);
    }
    else {
    next();
    }
})
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

//const httpServer = http.createServer(app);

const privateKey = fs.readFileSync('/etc/letsencrypt/live/cosmose.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/cosmose.me/fullchain.pem', 'utf8');

const httpsOptions = {
    key: privateKey,
    cert: certificate,
};

//const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(process.env.PORT,  () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});

/*httpServer.listen(80, () => {
    console.log('Serveur HTTP en écoute sur le port 80');
});*/