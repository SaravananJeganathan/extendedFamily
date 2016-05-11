var express = require('express');
var ejsmate = require('ejs-mate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var timeout = require('connect-timeout');

//Add for encrypt  the password
var bcrypt = require('bcrypt-nodejs');

var pconf = require('./config/passport')(passport); // pass passport for configuration

var app = express();
app.set('port', process.env.PORT || 8087);
app.use(timeout('3600s'));
app.engine('ejs', ejsmate)
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
    app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('view options', { layout: 'layout.ejs' });

app.use(require('express-session')({
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
    secret: 'abideasselfwithinyou',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(passport.authenticate('remember-me'));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(haltOnTimedout);

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/usersRoutes.js')(app);
require('./routes/codeTableRoutes.js')(app, passport);

app.use('/private', express.static(path.join(__dirname, '/private')));


    
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (!err)
        return next();
    res.send(500);
});



	
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

if (process.env.IsServiceMode) {
    app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
}

module.exports = app;

