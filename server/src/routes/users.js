const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.js");

router.get("/", usersCtrl.getCurrentUser);

module.exports = router;