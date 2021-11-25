const md5 = require('md5'); //md5 to hash passwords
const jwt = require('jsonwebtoken');
const db = require('../database/db');

//utils 
const {errorJson} = require('./jsonResponses')

// this probably shouldn't be imported from client side files
const {countdownIsValid} = require('../../client/src/utils/formValidation');

// check if user with entered username already exists - used when creating a new account
const checkSignUpDetails = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if username and passwords were entered and are valid lengths (4-30 char)
  if (!username) {
    res.status(400).json(errorJson('No username entered', 'username-error'));
  } else if (username.length < 4 || username.length > 20) {
    res.status(400).json(errorJson('Username must be between 4 and 20 characters', 'username-error'))
  } else if (!password) {
    res.status(400).json(errorJson('No password entered', 'password-error'));
  } else if (password.length < 4 || password.length > 30) {
    res.status(400).json(errorJson('Password must be between 4 and 30 characters', 'password-error'))
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

// check a submitted countdown (new or edited) meets all the requirements
const checkCountdown = (req, res, next) => {
  const countdown = req.body;

  if (!countdownIsValid(countdown)) {
    res.status(400).json(errorJson("Can't create countdown in the past"));
  } else if (!countdown.name || !countdown.date || !countdown.time) {
    res.status(400).json(errorJson("Please fill in countdown name, date and time"));
  } else {
    next()
  }
}

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