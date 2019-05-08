const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole('student'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

function checkRole(role) {
    return function (req, res, next) {
        if (req.decodedToken &&
            req.decodedToken.roles &&
            req.decodedToken.roles.includes(role)
        ) {
            next();
        } else {
            res.status(403).json({ message: "Unable to access users" })
        }
    }
}

module.exports = router;
