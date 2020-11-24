module.exports = function checkAuth(isAuthRequired) {
    return function (req, res, next) {
        const isNotAuthWhenAuthIsRequired = isAuthRequired && !req.user;

        if ((isNotAuthWhenAuthIsRequired) || (!isAuthRequired && req.user)) {
            res.redirect(isNotAuthWhenAuthIsRequired ? "/login" : "/");
            return;
        }

        next();
    };
};