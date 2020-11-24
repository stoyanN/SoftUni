const jwt = require('jsonwebtoken');
const { jwtSecret, cookieName } = require('../app-config');

module.exports = function (req, res, next) {
    const token = req.cookies[cookieName];

    if (!token) {
        next();
        return;
    }

    jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err) {
            next(err);
            return;
        }


        req.user = { _id: decoded.userId };
        res.locals.isAuth = !!req.user;
        res.locals.userId = req.user._id;
        next();
    });
};