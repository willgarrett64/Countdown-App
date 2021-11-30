const md5 = require('md5'); //md5 to hash passwords
const jwt = require('jsonwebtoken');
const db = require('../database/db');

//utils 
const {errorJson} = require('./jsonResponses')


// check if username exists - used when signing in
const verifyUsername = (req, res, next) => {
  const data = {
    username: req.body.username,
  }

  const query = "select * from users where username = ?"
  const params =[data.username];

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json(errorJson(err.message));
    } else if (!row) {
      res.status(401).json(errorJson('Username not found', 'username-error'));
    } else {
      next();
    }
  })
}

// check if password matches username - used when signing in
const verifyPassword = (req, res, next) => {
  const data = {
    username: req.body.username,
    password : md5(req.body.password)
  }

  const query = "select * from users where username = ? and password = ?"
  const params =[data.username, data.password];

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json(errorJson(err.message));
    } else if (!row) {
      res.status(401).json(errorJson('Incorrect password', 'password-error'));
    } else {
      req.username = data.username;
      req.userId = row.id;
      next();
    }
  })
}

// check if user with entered username already exists - used when creating a new account
const checkSignUpDetails = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if username and passwords were entered and are valid lengths
  if (!username) {
    res.status(400).json(errorJson('Please enter a username', 'username-error'));
  } else if (username.length < 4 || username.length > 20) {
    res.status(400).json(errorJson('Must be between 4 and 20 characters', 'username-error'));
  } else if (!password) {
    res.status(400).json(errorJson('Please enter a password', 'password-error'));
  } else if (password.length < 4 || password.length > 30) {
    res.status(400).json(errorJson('Must be between 4 and 30 characters', 'password-error'));
  } 
  // check if an existing account already has that username
  else {
    const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const params = [req.body.username];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json(errorJson(err.message));
      } else if (row) {
        res.status(400).json(errorJson('Username already exists', 'username-error'));
      } else {
        next();
      }
    })
  }
}


// get current date and time
const getNow = () => {
  const now = new Date();

  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}`

  return {date, time}
}

// verify date and time are in the future (comparing to current date and time)
const checkDateInFuture = (date, time) => {
  const now = getNow();

  const nowUnix = Date.parse(now.date + ' ' + now.time);
  const inputUnix = Date.parse(date + ' ' + time);


  if (inputUnix <= nowUnix) {
    return false
  } else {
    return true;
  }
}

const getCountdownError = countdown => {
  const {name, date, time} = countdown;

  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegEx = /^\d{2}:\d{2}/;

  // verify all fields are not blank
  if (!name) return errorJson('Please enter a countdown name', 'countdown-name-error');
  if (!date) return errorJson('Please enter a countdown date', 'countdown-date-error');
  if (!time) return errorJson('Please enter a countdown time', 'countdown-time-error');

  // verify countdown name is valid length
  if (countdown.name.length > 35) return errorJson('Countdown name can\'t exceed 35 characters', 'countdown-name-error');

  // verify date/time aren't in the past
  if (!checkDateInFuture(date, time)) return errorJson('Can\'t create countdown in the past', 'countdown-date-error');

  // verify date and time are in correct format
  if (!countdown.date.match(dateRegEx)) return errorJson('Date format incorrect', 'countdown-date-error');
  if (!countdown.time.match(timeRegEx)) return errorJson('Time format incorrect', 'countdown-time-error');

  // if passed all tests return false (no errors)
  return false;
}


// check a submitted countdown (new or edited) meets all the requirements
const checkCountdown = (req, res, next) => {
  const countdown = req.body;

  const error = getCountdownError(countdown);

  if (error) {
    res.status(400).json(error)
  } else {
    next()
  }
}





const secret = 'mysecretsshhh'; //temporary token string - WILL NEED TO HIDE

// check if the user holds a valid json web token (issued when signing in successfully)
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.username = decoded.username;
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

module.exports = {checkSignUpDetails, checkCountdown, verifyUsername, verifyPassword, verifyToken}