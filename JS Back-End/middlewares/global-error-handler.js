const { cookieName } = require('../app-config');

module.exports = function globalErrorHandler(err, req, res, next) {
    if (err.message.includes("expired")) {
        res.clearCookie(cookieName);
        res.redirect('/login');
        return;
    }

    if (err.message.includes("Filed")) {
        res.redirect('/');
        return;
    }

    if (err) {
        console.error(err);
        res.redirect('/');
    }

    return;
};