const apiCtrl = require("../controllers/api.js");
const auth = require("./../auth.js");
const express = require("express");
const messages = require("./../messages.js");
const theme = require("./../controllers/theme.js");
const router = express.Router();

router.post("/login", apiCtrl.login)
.put("/signin", apiCtrl.signin)
.use("/messages", auth, messages)
.post("/theme", auth, theme.changeDefaultTheme);


module.exports = router;