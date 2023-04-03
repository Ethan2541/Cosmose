const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
client.connect((err) => {
    if(err) throw err;
    console.log("Connecté à MongoDB");
})

db = client.db("db1");

module.exports = db;