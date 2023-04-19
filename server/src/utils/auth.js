const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
    // Parse the token
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({ error: 'Invalid token'});
        }
        req.user = decoded;
    });
    
    next();
};