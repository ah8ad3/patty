const setting = require('../../settings/settings');
const express = require('express');
const router = express.Router();

const passport = setting.passport;


// show the home page (will also have our login links)
router.get('/', function(req, res) {
    res.render('index.pug');
});

// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', {
        user : req.user
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// locally --------------------------------
router.get('/login', function(req, res) {
    res.render('login.pug', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/register', function(req, res) {
    res.render('register.pug', { message: req.flash('SignUpMessage') });
});

// process the register form
router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// google ---------------------------------
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// locally --------------------------------
router.get('/connect/local', function(req, res) {
    res.render('connect-local.pug', { message: req.flash('loginMessage') });
});

router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// google ---------------------------------

// send to google to do the authentication
router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

// the callback after google has authorized the user
router.get('/connect/google/callback',
    passport.authorize('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// local -----------------------------------
router.get('/unlink/local', isLoggedIn, function(req, res) {
    const user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function() {
        res.redirect('/profile');
    });
});

// google ---------------------------------
router.get('/unlink/google', isLoggedIn, function(req, res) {
    const user          = req.user;
    user.google.token = undefined;
    user.save(function() {
        res.redirect('/profile');
    });
});


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}


module.exports = router;
