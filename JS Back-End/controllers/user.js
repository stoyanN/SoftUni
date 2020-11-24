const models = require('../models');
const jwt = require('jsonwebtoken');
const { jwtSecret, cookieName } = require('../app-config');

module.exports = {
    getSearch(req, res, next) {
        const { searchValue } = req.body;
        const regex = new RegExp(searchValue, 'i');

        models.courseModel.find().lean()
            .then(courses => {
                const foundCourses = courses
                    .map(a => {
                        a.createdAt = a.createdAt.toLocaleString();
                        return a;
                    })
                    .filter(a => {
                        if (a.title.match(regex)) {
                            return a;
                        }
                    });
                res.render('user-home', { courses: foundCourses });
            }).catch(next);
    },
    getHomepage(req, res, next) {
        if (res.locals.isAuth) {

            models.courseModel.find().sort({ createdAt: 1 }).lean()
                .then(courses => {
                    courses.map(a => a.createdAt = a.createdAt.toLocaleString());
                    res.render('user-home', { courses });
                }).catch(next);

        } else {
            models.courseModel.find().lean()
                .then(courses => {
                    const topCourses = courses.sort((a, b) => {
                        return b.usersEnrolled.length - a.usersEnrolled.length;
                    }).slice(0, 3);

                    res.render('guest-home', { topCourses });
                }).catch(next);
        }
    },
    getRegister(req, res, next) {
        res.render('register');
    },
    postRegister(req, res, next) {
        const { username = null, password = null, rePassword = null } = req.body;
        const errorMessage = {};

        const regex = /^[A-Za-z0-9]+$/i;
        const isUsernameOk = !!username.match(regex);
        const isPasswordOk = !!password.match(regex);

        if (!username || !password || !rePassword) {
            errorMessage.two = `Please fill all required data!`;
        }

        if (password !== rePassword) {
            errorMessage.one = `Passwords don't match!`;
        }

        if (!isUsernameOk || !isPasswordOk) {
            errorMessage.three = `Username and Password must consist only of English letters and digits!`;
        }


        if (username.length < 5 || password.length < 5) {
            errorMessage.four = `Email and Password must be at least 5 characters long!`;
        }

        if (Object.keys(errorMessage).length > 0) {
            res.render('register', { errorMessage });
            return;
        }

        models.userModel.create({ username, password })
            .then((data) => {
                const userId = data._id.toString();

                return jwt.sign({ userId }, jwtSecret);
            })
            .then(userToken => {
                if (userToken) {
                    res.cookie(cookieName, userToken, { httpOnly: true });
                    res.redirect('/');
                }

                return;
            })
            .catch(next);
    },
    getLogin(req, res, next) {
        res.render('login');
    },
    postLogin(req, res, next) {
        const { username, password } = req.body;
        const errorMessage = {};

        models.userModel.findOne({ username })
            .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
            .then(([user, match]) => {
                if (!match) {
                    errorMessage.wrongLogin = "Wrong username or password!";
                    res.render('login', { errorMessage });
                    return;
                }

                return jwt.sign({ userId: user._id }, jwtSecret);
            })
            .then(userToken => {
                if (userToken) {
                    res.cookie(cookieName, userToken, { httpOnly: true });
                    res.redirect('/');
                }

                return;
            })
            .catch(next);
    },
    postLogout(req, res, next) {
        res.clearCookie(cookieName);
        res.redirect('/');
    }
};