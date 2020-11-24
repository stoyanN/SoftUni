const models = require('../models');

module.exports = {
    getCreate(req, res, next) {
        res.render('create');
    },
    postCreate(req, res, next) {
        const { title = null, description = null, imageUrl = null, duration = null, } = req.body;
        const creator = req.user;

        const errorMessage = {};
        const regex = /^[https?]+/i;

        if (!title || !description || !imageUrl || !duration) {
            errorMessage.one = "All fields should be filled!";
        }

        if (title.length < 4) {
            errorMessage.two = "Title should be at least 4 characters!";
        }

        if (description.length < 20 || description.length > 50) {
            errorMessage.three = "The description should be between 20 and 50 characters long";
        }

        const isUrlOk = !!imageUrl.match(regex);

        if (!isUrlOk) {
            errorMessage.four = "The imageUrl should starts with http or https";
        }

        if (Object.keys(errorMessage).length > 0) {
            res.render('create', { errorMessage });
            return;
        }

        models.courseModel.create({ title, description, imageUrl, duration, creator })
            .then(() => {
                res.redirect('/');
                return;
            })
            .catch(next);
    },
    getDetails(req, res, next) {
        const id = req.params.id;
        const userid = req.user._id;

        Promise.all([
            models.courseModel.findById(id).lean(),
            models.courseModel.find({ _id: id, usersEnrolled: { $nin: userid } }).lean()
        ])
            .then(([course, match]) => {
                const isEnrolled = match.length === 0 ? true : false;
                const isAuthor = req.user._id === course.creator.toString();
                res.render('details', { course, isAuthor, isEnrolled });
            })
            .catch(next);
    },
    getEdit(req, res, next) {
        const id = req.params.id;

        models.courseModel
            .findById(id)
            .lean()
            .then(course => {
                res.render('edit', { course, id });
            })
            .catch(next);
    },
    postEdit(req, res, next) {
        const id = req.params.id;
        const { title = null, description = null, imageUrl = null, duration = null, } = req.body;

        const errorMessage = {};
        const regex = /^[https?]+/i;

        if (!title || !description || !imageUrl || !duration) {
            errorMessage.one = "All fields should be filled!";
        }

        if (title.length < 4) {
            errorMessage.two = "Title should be at least 4 characters!";
        }

        if (description.length < 20 || description.length > 50) {
            errorMessage.three = "The description should be between 20 and 50 characters long";
        }

        const isUrlOk = !!imageUrl.match(regex);

        if (!isUrlOk) {
            errorMessage.four = "The imageUrl should starts with http or https";
        }

        if (Object.keys(errorMessage).length > 0) {
            models.courseModel.findById(id).lean()
                .then(course => {
                    res.render('edit', { course, id, errorMessage });
                }).catch(next);
                return;
            // res.redirect(`/edit/${id}`);
        }

        models.courseModel.updateOne({ _id: id }, { $set: { ...req.body } }).then(() => {
            res.redirect(`/details/${id}`);
        }).catch(next);
    },
    getDelete(req, res, next) {
        const id = req.params.id;

        models.courseModel.deleteOne({ _id: id }, function (err) {
            if (err) {
                next(err);
            }
        }).then(() => {
            res.redirect('/');
        }).catch(next);
    },
    getEnroll(req, res, next) {
        const courseId = req.params.id;
        const userId = req.user._id;

        Promise.all([
            models.courseModel.updateOne({ _id: courseId }, { $addToSet: { usersEnrolled: userId } }).lean(),
            models.userModel.updateOne({ _id: userId }, { $addToSet: { enrolledCourses: courseId } }).lean()
        ]).then(() => {
            res.redirect(`/details/${courseId}`);
        }).catch(next);
    },


};