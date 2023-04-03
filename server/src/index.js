const api = require("./routes/api.js");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const search = require("./routes/search.js");
const users = require("./routes/users.js");

const app = express();
dotenv.config();

app.use(cors())
.use(express.json())
.use(express.static(path.join(__dirname, "../../client/build")))
.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/search", search);
app.use("/users", users);

app.use("/*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
})

app.listen(process.env.PORT,  () => {
    console.log(`server listening on: ${process.env.PORT}`);
});