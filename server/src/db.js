const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://alolop_ovh:UkfvG2T00w6innQQ@cosmose.6pydv0w.mongodb.net/?retryWrites=true&w=majority";

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