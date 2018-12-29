const setting = require('../../settings/settings');
const express = require('express');
const router = express.Router();

const passport = setting.passport;
const {message} = require('./messages');
const validator = require('validator');
const {UserModel} = require('./models');

const patty = require('../../lib/patty');

// show the home page (will also have our login links)
router.get('/', function(req, res) {
    // res.render('index.pug');
    res.status(200).render('index.html');
});

router.get('/users', setting.cache.route(5000), function (req, res) {
    UserModel.find({}, function (err, data) {
        res.send(data)
    })
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.html', {
        user : req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// local section -----------
router.get('/login', function(req, res) {
    res.render('login.html');
});

router.post('/login', function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    if (validator.isEmail(email) || validator.isEmpty(pass) === false) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return res.status(500).send({error: message().server_error})
            }
            // Generate a JSON response reflecting authentication status
            if (user === false) {
                return res.status(400).send({error: message().wrong_login});
            }
            req.login(user, function (err) {
                if (err) {
                    return res.status(400).send({error: message().wrong_login});
                }
                return res.status(200).send({success: message().hi});
            });
        })(req, res, next);
    }else {
        res.status(400).send({error: message().input_format})
    }
});


router.post('/obtain-jwt', patty.jwt_obtain);


router.get('/register', function(req, res) {
    res.render('register.html', { message: req.flash('SignUpMessage') });
});

router.post('/register', (req, res) => {
    let body = {
        password: req.body.password,
        email: req.body.email,
    };
    if (validator.isEmail(body.email) && !validator.isEmpty(body.password)) {
        if (!req.user) {
            UserModel.findOne({ 'local.email' :  body.email}, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return res.status(500).send(message().server_error);

                // check to see if theres already a user with that username
                if (user) {
                    return res.status(400).send(message().email_taken);
                } else {

                    // create the user
                    const newUser = new UserModel();
                    newUser.local.email = body.email;
                    newUser.local.password = newUser.generateHash(body.password);

                    newUser.save(function(err) {
                        if (err)
                            return res.status(500).send(message().server_error);

                        return res.status(201).send(message().register_suc);
                    });
                }

            });
        }else {
            return res.status(400).send(message().logout_first);
        }
    }else {
        return res.status(400).send(message().input_format);
    }
});



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).send(message().unauthorized);
}


module.exports = router;
