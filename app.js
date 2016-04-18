var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
 var logger = require('morgan');
 var expressSession = require('express-session');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var passport = require('passport');
 var methodOverride = require('method-override');


 var libs = process.cwd() + '/';
//  //var libs = process.cwd() + './';
 require('./auth/auth');

var config = require('./config');
 var log = require('./log')(module);
 var oauth2 = require('./auth/oauth2');


var routes = require('./routes/index');

var users = require('./routes/users');
var api = require('./routes/api');
var articles = require('./routes/articles');
var authenticate = require('./routes/authenticate');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: 'secret',cookie:{maxAge:3600}}));
app.use(methodOverride());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
console.log("enetered before route");

app.use('/', routes);
app.use('/api', api);
app.use('/users', users);
app.use('/articles', articles);
app.use('/authenticate', authenticate);
//app.use('/api/oauth/token', oauth2.token);

console.log("enetered after route");
app.use('/oauth/authorize',  oauth2.token);


// app.use(expressSession({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         maxAge: 3600
//     }
// }));

// 
// app.use('/oauth/authorize',  oauth2.token,function(err, req, res, next){
//     
//    res.render('Entered after Token');
//     //console.log('entered after the token');
// });
//      
//  




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
