const assetsCtrl = require('../controllers/assets.js');
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.js');

router.post('/', upload.single('image'), assetsCtrl.postAssets);

module.exports = router;