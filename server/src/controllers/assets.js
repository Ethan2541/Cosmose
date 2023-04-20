const cloudinary = require('../utils/cloudinary');


// Upload assets
exports.postAssets = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path)
        .then(result => {
            res.status(200).json({ newUrl: result.secure_url, newId: result.public_id })
        })
        .catch(err => res.status(500).json({ error: 'Could not post the assets' }));
}