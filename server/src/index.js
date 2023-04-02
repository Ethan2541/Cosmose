const api = require("./routes/api.js");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api", api)
.use("/", (req, res, next) => {
    res.render(path.join(__dirname, "../../client/src/", "index.js"));
})

app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});