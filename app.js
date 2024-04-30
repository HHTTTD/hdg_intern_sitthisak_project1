const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); //เพิ่ม cors
const session = require('express-session'); // เพิ่ม express-session
const passport = require('passport'); // เพิ่ม passport
require('dotenv').config();
const mongoose = require('mongoose');
const products = require('./routes/products');
const post = require('./routes/post');
const comment = require('./routes/comment');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST)
        .then(() => console.log('-Connection Successfully!-'))
        .catch((err) => console.error(err))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


// Cross Origin Resource Sharing
const whitelist = ['https://www.nightlife.run', 'http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,PATCH,DELETE",
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions));

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/products', products);
app.use('/post', post);
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;