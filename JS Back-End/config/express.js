const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const username = require('../middlewares/username');

module.exports = (app) => {
    app.engine('.hbs', exphbs({ extname: '.hbs' }));
    app.set('view engine', '.hbs');

    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));
    app.use(auth);
    app.use(username);
    
    app.use(express.static(path.resolve(__baseDir, "static")));
};