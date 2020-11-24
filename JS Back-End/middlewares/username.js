const models = require('../models');

module.exports = function (req, res, next) {
    const userId = req.user;

    if (!userId) {
        next();
        return;
    }

    models.userModel.findById(userId).lean()
        .then(user => {
            res.locals.username = user.username;
            next();
            return;
        }).catch(next);
};