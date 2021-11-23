const md5 = require('md5'); //md5 to hash passwords
const jwt = require('jsonwebtoken');
const db = require('../database/db');

// this probably shouldn't be imported from client side files
const countdownIsValid = require('../../client/src/utils/formValidation');

// check if user with entered username already exists - used when creating a new account
const checkSignUpDetails = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if username and passwords were entered and are valid lengths (4-30 char)
  if (!username) {
    res.status(400).json({"error": 'No username entered'});
  } else if (username.length < 4 || username.length > 30) {
    res.status(400).json({"error": 'Please enter a username between 4 and 30 characters long'})
  } else if (!password) {
    res.status(400).json({"error": 'No password entered'});
  } else if (password.length < 4 || password.length > 30) {
    res.status(400).json({"error": 'Please enter a password between 4 and 30 characters long'})
  } 
  // check if an existing account already has that username
  else {
    const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const params = [req.body.username];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error": err.message});
      } else if (row) {
        res.status(400).json({"error": 'Username already exists'});
      } else {
        next();
      }
    })
  }
}


const checkCountdown = (req, res, next) => {
  const countdown = req.body;

  if (!countdownIsValid(countdown)) {
    res.status(400).json({"error":"Can't create countdown in the past"});
  } else if (!countdown.name || !countdown.date || !countdown.time) {
    res.status(400).json({"error":"Please fill in countdown name, date and time"});
  } else {
    next()
  }
}

// check if the username and password combination matches an existing user account - used when signing in
const verifyUserCredentials = (req, res, next) => {
  const data = {
    username: req.body.username,
    password : md5(req.body.password)
  }

  const query = "select * from users where username = ? and password = ?"
  const params =[data.username, data.password];

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message});
    } else if (!row) {
      res.status(401).json({"error": 'Incorrect email or password'});
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

module.exports = {checkSignUpDetails, checkCountdown, verifyUserCredentials, verifyToken}