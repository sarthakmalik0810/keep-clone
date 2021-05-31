const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const auth = require('./routes/auth');

//LOAD CONFIG
dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport);
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//SESSION MIDDLEWARE
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', auth);


const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
