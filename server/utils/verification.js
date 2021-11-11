const md5 = require('md5'); //md5 to hash passwords
const jwt = require('jsonwebtoken');
const db = require('../database/db');


const verifyUser = (req, res, next) => {
  const data = {
    username: req.body.username,
    password : md5(req.body.password)
  }

  const query = "select * from users where username = ? and password = ?"
  const params =[data.username, data.password];

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
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

module.exports = {verifyUser, verifyToken}