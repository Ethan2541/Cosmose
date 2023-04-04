const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MongoDB');
});

db = client.db('db1');

module.exports = db;