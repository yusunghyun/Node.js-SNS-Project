var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionStore = require('session-file-store')(session); //이놈 자체가 하나의 함수 원형을 받는거라 () 추가하고 session도 박자
var logger = require('morgan');
var methodOverride = require("method-override");
var cookieParser = require('cookie-parser');
var rfs = require('rotating-file-stream');
require('dotenv').config(); //env실행 방법.
var passportConfig = require('./passport/index.js');
var passport = require('passport');
var flash = require('connect-flash');

var { sequelize } = require('./models'); //기본값이 index.js

var app = express();
sequelize.sync(); //{force:true}
// view engine setup
app.locals.pretty = true;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files',express.static(path.join(__dirname, 'uploads')));
app.use(flash());
app.use(session({
  secret: process.env.SECRET,//salt같은거래
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }  //이거대신
  store: new sessionStore()   //이거!
}));
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

/* Morgan 셋팅 */
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});
app.use(logger('combined', { stream: accessLogStream }));

/* Method-Override 셋팅 */
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

var indexRouter = require('./routes/index.js');
var userRouter = require('./routes/user.js');
var authRouter = require('./routes/auth.js');
var postRouter = require('./routes/post.js');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);

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
