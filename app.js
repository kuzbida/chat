var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require(path.join(__dirname,'libs/log'))(module);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
log.info('app.js runs');
//Middleware
app.use(function (req, res, next) {
  if(req.url == '/') {
    res.end('Say goodbay');
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  if(req.url == '/forbidden'){
    next({message: "wops, denied"})
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  if(req.url == '/test'){
    res.end('Say hello');
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Page not found");
});

//error handler
app.use(function (err, req, res, next) {
  //app.get('env')
    log.info("ERROR", err.message);
  if(app.get('env') === 'development'){
    res.status(err.status || 500).send(err.message);
  }
});
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
});*/

module.exports = app;
