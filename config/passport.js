var sqlHelper = require('../config/database');
// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;



var bcrypt = require('bcrypt-nodejs')

// expose this function to our app using module.exports
module.exports = function (passport) {
    
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.userId);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        var sql = "SELECT * FROM extfamily.users WHERE UserId = ?";
        sqlHelper.executeQuery(sql, id, function (err, user) {
            done(err, user[0]);
        });
    });
    
    passport.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // ================== app.post('/api/users', passport.ensureAuthenticated, function (req, res, next) {
   
//sad=======================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use("local-login", new LocalStrategy({hiddenField: 'type', passReqToCallback: true}, 
    function (req, username, password, done) {
       //if(req.body.type=='D')
       // var sql = "SELECT * FROM extfamily.donorusers WHERE UserId = ?";
        //else
        //var sql = "SELECT * FROM extfamily.beneficiaryusers WHERE UserId = ?";
        
        var sql = "SELECT * FROM extfamily.users WHERE UserId = ?";
        sqlHelper.executeQuery(sql, username, function (err, user) {
            try {
                if (user === null || user.length == 0) {
                    return done(null, false, { message: 'Invalid username or password' });
                } else {                  
                    if (!bcrypt.compareSync(password, user[0]["password"])) {
                      // return done(null, user[0]);
                       return done(null, false, { message: 'Invalid username or password' });
                    } else {
                        return done(null, user[0]);
                    }
                }
            } catch (e) {
                return done(e, false, { message: 'Invalid username or password' } );
            }
        });
    }));

    
     passport.use("local-password_reset", new LocalStrategy(function (username, password,done) {
        var a = 1;
        var sql = "SELECT * FROM extfamily.users WHERE UserId = ?";
        sqlHelper.executeQuery(sql, username, function (err, user) {
            try {
                if (user === null || user.length == 0) {
                    return done(null, false, { message: 'Invalid username' });
                } else {
               
                        return done(null, user[0]);
                    
                }
            } catch (e) {
                return done(e, false, { message: 'Invalid username' });
            }
        });
    }));

 
          
};
