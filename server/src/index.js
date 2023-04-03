const api = require("./routes/api.js");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const users = require("./routes/users.js");
const messages = require("./messages.js");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/users", users);

app.use("/*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
})

app.listen(process.env.PORT,  () => {
    console.log(`server listening on: ${process.env.PORT}`);
});