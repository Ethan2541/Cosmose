const apiCtrl = require("../controllers/api.js");
const auth = require("./../auth.js");
const express = require("express");
const messages = require("./../messages.js");
const timespent = require("./../controllers/timespent.js");
const router = express.Router();

router.post("/login", apiCtrl.login)
.put("/signin", apiCtrl.signin)
.use("/messages", auth, messages)
.post("/timespent", auth, timespent.timeSpent);  

module.exports = router;