const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: 'Token invalide'});
        }
        req.user = decoded;
    });
    next();
};