const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const auth = require('./routes/api/auth');
const cors = require('cors');

//LOAD CONFIG
dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

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
app.use('/api/auth', auth);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/todo', require('./routes/api/todo'));


const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
