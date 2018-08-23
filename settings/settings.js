const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const log = require('../lib/log');
const locale_md = require('../lib/locale_middleware');
const session = require('express-session');
const compression = require('compression');
const Raven = require('raven');
const cors = require('cors');

const flash = require('connect-flash');
const {internal} = require('./messages');

let secret_key = process.env.SECRET_KEY;

if (process.env.PD_FLAG === 'test') {
    secret_key = 'thisisantestkey';
    process.env.DB_NAME = 'test_potty';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';
    process.env.REDIS_SES_HOST='localhost';
    process.env.REDIS_SES_PORT='6379';
    process.env.SOCKET_USE = '1';
}

if (secret_key === undefined || secret_key === '' || secret_key.length < 6){
    log.danger(internal.secret_key_error);
    process.exit();
}

if (process.env.DB_NAME === undefined || process.env.DB_NAME === ''){
    log.danger(internal.db_name_missed);
    process.exit();
}


let production = (app) => {
    // check if redis connected or not
    require('./_redis');

    const RedisStore = require('connect-redis')(session);
    let redis = new RedisStore({host: process.env.REDIS_SES_HOST, port: process.env.REDIS_SES_PORT});

    // compress response body for decrease size
    app.use(compression());

    app.use(session({
        cookie:{
            maxAge:60000
        },
        store: redis,
        secret: process.env.SECRET_KEY,
        saveUninitialized: true,
        resave: false
    }));

    Raven.config(`https://${process.env.RAVEN_KEY}@sentry.io/${process.env.RAVEN_NAME}`).install();
};

let debug = (app) => {
    const logger = require('morgan');

    // logger for requests
    app.use(logger('dev'));

    // authentication
    app.use(session({
        secret: secret_key, // session secret
        resave: true,
        saveUninitialized: true,
    }));

    log.danger(internal.loaded_in_dev);
};

let test = (app) => {
    // authentication
    app.use(session({
        secret: secret_key, // session secret
        resave: true,
        saveUninitialized: true,
    }));
};


function settings(app, express){
    // view engine setup
    app.set('views', path.join(__dirname, '../assets/templates'));
    app.set('view engine', 'pug');

    // dev flag set on settings
    if (process.env.PD_FLAG === 'dev'){
        debug(app);

    }else if (process.env.PD_FLAG === 'pro') {
        production(app);

    } else if (process.env.PD_FLAG === 'test'){
        test(app);

    } else {
        log.danger(internal.in_db_flag_error);
        process.exit()
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // cors header support for all headers
    app.use(cors());

    require('../lib/passport')(passport);

    // locale middleware
    app.use(locale_md);

    // import database here
    require('./database');

    log.info(internal.setting_import);
}


let googleAuth = {
    clientID: process.env.OA_CLIENT_ID,
    clientSecret: process.env.OA_CLIENT_SECRET,
    callbackURL: process.env.OA_CALLBACK
};

if (process.env.PD_FLAG === 'test') {
    googleAuth = {
        clientID: 'test',
        clientSecret: 'test',
        callbackURL: 'test.test'
    }
}

const private_storage = 'assets/media/private/';

module.exports = {
    settings: settings,
    secret_key: secret_key,
    googleAuth: googleAuth,
    passport: passport,
    p_storage: private_storage
};
