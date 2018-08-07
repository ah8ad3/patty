const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const log = require('../lib/log');
const session = require('express-session');
const flash = require('connect-flash');


const secret_key = 'ajhbksjna3rq9efyeohqe0';

function settings(app, express){
    // view engine setup
    app.set('views', path.join(__dirname, '../templates'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../statics')));

    // authentication
    app.use(session({
        secret: secret_key, // session secret
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    require('../lib/passport')(passport);

    // import database here
    require('./database');

    log.info('settings imported');
}


const googleAuth = {
    clientID: '485355207592-tl1c7ft0eia7c1vu4q2iuqtksms1ega5.apps.googleusercontent.com',
    clientSecret: 'GLrzF6gxU6bruiRyPBhqAXyT',
    callbackURL: 'http://localhost:5000/auth/google/callback'
};

module.exports = {
    settings: settings,
    secret_key: secret_key,
    googleAuth: googleAuth,
    passport: passport
};
