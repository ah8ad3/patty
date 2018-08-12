const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const log = require('../lib/log');
const locale_md = require('../lib/locale_middleware');
const session = require('express-session');
const compression = require('compression');

const flash = require('connect-flash');
const {internal} = require('./messages');


const secret_key = process.env.SECRET_KEY;
if (secret_key === undefined || secret_key === '' || secret_key.length < 6){
    log.danger(internal.secret_key_error);
    process.exit();
}

function settings(app, express){
    // view engine setup
    app.set('views', path.join(__dirname, '../templates'));
    app.set('view engine', 'pug');

    // dev flag set on settings
    if (process.env.PD_FLAG === 'dev'){
        // logger for requests
        app.use(logger('dev'));

        // should use nginx or apache instead
        app.use(express.static(path.join(__dirname, '../statics')));

        log.danger(internal.loaded_in_dev);
    }else if (process.env.PD_FLAG === 'pro') {
        // compress response body for decrease size
        app.use(compression());
    } else {
        log.danger(internal.in_db_flag_error);
        process.exit()
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

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

    // locale middleware
    app.use(locale_md);

    // import database here
    require('./database');

    log.info(internal.setting_import);
}


const googleAuth = {
    clientID: process.env.OA_CLIENT_ID,
    clientSecret: process.env.OA_CLIENT_SECRET,
    callbackURL: process.env.OA_CALLBACK
};

module.exports = {
    settings: settings,
    secret_key: secret_key,
    googleAuth: googleAuth,
    passport: passport
};
