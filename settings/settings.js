const path = require('path');
const cookieParser = require('cookie-parser');
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

if (process.env.DB_NAME === undefined || process.env.DB_NAME === ''){
    log.danger(internal.secret_key_error);
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
};

let debug = (app, express) => {
    const logger = require('morgan');

    // logger for requests
    app.use(logger('dev'));

    // should use nginx or apache instead
    app.use(express.static(path.join(__dirname, '../statics')));

    // authentication
    app.use(session({
        secret: secret_key, // session secret
        resave: true,
        saveUninitialized: true,
    }));

    log.danger(internal.loaded_in_dev);
};

let test = (app, express) => {
    // should use nginx or apache instead
    app.use(express.static(path.join(__dirname, '../statics')));

    // authentication
    app.use(session({
        secret: secret_key, // session secret
        resave: true,
        saveUninitialized: true,
    }));
};


function settings(app, express){
    // view engine setup
    app.set('views', path.join(__dirname, '../templates'));
    app.set('view engine', 'pug');

    // dev flag set on settings
    if (process.env.PD_FLAG === 'dev'){
        debug(app, express);

    }else if (process.env.PD_FLAG === 'pro') {
        production(app);
        // Temporary
        app.use(express.static(path.join(__dirname, '../statics')));

    } else if (process.env.PD_FLAG === 'test'){
        test(app, express);

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
