const apiCtrl = require("../controllers/api.js");
const express = require("express");
const router = express.Router();

router.post("/login", apiCtrl.login);
router.put("/signin", apiCtrl.signin);

module.exports = router;