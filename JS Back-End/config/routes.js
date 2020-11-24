const controllers = require('../controllers');
const checkAuth = require('../middlewares/check-auth');

module.exports = (app) => {
    app.get("/", controllers.user.getHomepage);

    app.get('/register', checkAuth(false), controllers.user.getRegister);
    app.post('/register', checkAuth(false), controllers.user.postRegister);

    app.get('/login', checkAuth(false), controllers.user.getLogin);
    app.post('/login', checkAuth(false), controllers.user.postLogin);

    app.get('/logout', checkAuth(true), controllers.user.postLogout);

    app.get('/create', checkAuth(true), controllers.course.getCreate);
    app.post('/create', checkAuth(true), controllers.course.postCreate);

    app.get('/details/:id', checkAuth(true), controllers.course.getDetails);

    app.get('/edit/:id', checkAuth(true), controllers.course.getEdit);
    app.post('/edit/:id', checkAuth(true), controllers.course.postEdit);

    app.get('/delete/:id', checkAuth(true), controllers.course.getDelete);

    app.get('/enroll/:id', checkAuth(true), controllers.course.getEnroll);

    app.post('/search', checkAuth(true), controllers.user.getSearch);

    app.get('*', (req, res, next) => {
        res.redirect('/');
        return;
    });
};