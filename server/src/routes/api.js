const apiCtrl = require("../controllers/api.js");
const express = require("express");
const messages = require("./../messages.js");
const router = express.Router();

router.post("/login", apiCtrl.login);
router.put("/signin", apiCtrl.signin);
router.use("/messages", messages);

module.exports = router;