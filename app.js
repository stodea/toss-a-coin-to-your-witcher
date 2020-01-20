var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('./models');
var bcrypt = require('bcrypt-node');

var User = mongoose.model('User');


mongoose.connect('mongodb+srv://admin:wnkGs9xS762eSVWC@cluster0-ce5ak.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res,next){
  res.render('index', {title: "First"})
});

app.post('/signup',function(req,res,next){
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if (err) return next (err);
    if (user) return next ({message: "User already exists"});
    let newUser = new User({
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });
    newUser.save();
  });
  console.log(req.body);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
