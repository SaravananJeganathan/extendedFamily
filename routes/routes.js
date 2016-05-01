var http = require('http');
var url = require('url');
var flash = require('req-flash');

module.exports = function (app, passport) {
    
app.get('/', function (req, res) {
        res.render('../private/index.ejs', {
            title: 'NGO - Dashboard',
            user : req.user // get the user out of session and pass to template
        });
    });
    
    app.get('/signUp', function (req, res) {
        res.render('../private/admin/signUp.ejs', {
            title: 'EXT - SignUp',
            //user : req.user // get the user out of session and pass to template
        });
    });
    
    app.get('/dHome', passport.ensureAuthenticated, function (req, res) {
        res.render('../private/donor/home.ejs', {
            title: 'EXT - Home',
            user : req.user // get the user out of session and pass to template
        });
    });
    
    app.get('/bHome', passport.ensureAuthenticated, function (req, res) {
        res.render('../private/benefiter/home.ejs', {
            title: 'EXT - Home',
            user : req.user // get the user out of session and pass to template
        });
    });
    // app.get('/donorLogin', function (req, res) {
    //     res.render('../private/donor/dLogin.ejs', {
    //         title: 'EXT - SignUp',
    //         //user : req.user // get the user out of session and pass to template
    //     });
    // });
    
    // app.get('/benefiterLogin', function (req, res) {
    //     res.render('../private/benefiter/bLogin.ejs', {
    //         title: 'EXT - SignUp',
    //         //user : req.user // get the user out of session and pass to template
    //     });
    // });
    
    
    app.get('/api/isAuthenticatedUser', passport.ensureAuthenticated, function (req, res) {
        res.json({ user: req.user, isLoggedIn: true });
    });
    
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        res.clearCookie('remember_me');
        req.logout();
        res.redirect('/');
    });
    
    app.get('/login', function (req, res) {
        res.render('../private/admin/login.ejs', {
            title: 'EXT - Login',
            //user : req.user // get the user out of session and pass to template
        });
    });
    
     app.post('/login', function (req, res, next) {
        console.log('req user' + req.body);
        passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/signUp' }, function (err, user, info) {
            if (err) {
                return res.render('login', { title: 'Login', errorMessage: err.message });
            }
            
            if (!user) {
                return res.render('login', { title: 'Login', errorMessage: info.message });
            } else if (user.enabled[0] == false) {
                return res.render('login', { title: 'Login', errorMessage: "You are account is inactive. Please contact administrator." });
            }
            else if (user.enabled[0] == true) {
                return req.logIn(user, function (err) {
                    if (err) {
                        return res.render('login', { title: 'Login', errorMessage: err.message });
                    } else {
                        // Issue a remember me cookie if the option was checked
                        if (req.body.remember_me) {
                            issueToken(req.user, function (err, token) {
                                if (err) { return next(err); }
                                res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
                                return res.redirect('/');
                            });
                        }
                        else {
                            if(user.badge=='B')
                            res.redirect('/bHome');
                            else
                            res.redirect('/dHome');
                        }
                    }
                });
            }
        })(req, res, next);
    });
    
    };
