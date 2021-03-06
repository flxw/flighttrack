var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require("stylus");
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var config = require('./config');
require('./config/passport')(passport)

var app  = express();
var port = process.env.PORT || '3000';

mongoose.connect(config.database.url);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: config.secrets.session }));
app.use(passport.initialize());
app.use(passport.session());
app.use(stylus.middleware(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'app')));

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

require('./routes/trip')(app)
require('./routes/image')(app)
require('./routes/user')(app, passport)

app.listen(port)