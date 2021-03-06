const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
            // token is invalid, expired or modified
            res.status(401).json({ error: "Invalid token" })
        } else {
            // token is valid
            req.decodedToken = decodedToken;
            next();
        }
    });
};
