const express = require('express');

//middleware
const jwt = require('jsonwebtoken');
const md5 = require('md5'); //md5 to hash passwords
const {checkSignUpDetails, verifyUsername, verifyPassword, verifyToken} = require('../utils/verification');

// connect to SQLite database
const db = require('../database/db')

//utils
const {errorJson} = require('../utils/jsonResponses')

const usersRouter = express.Router();

// TOKEN SECRET - WILL CHANGE AND HIDE
const secret = 'mysecretsshhh';

// create a new user account
usersRouter.post("/signup", checkSignUpDetails, (req, res, next) => {
  const data = {
      username: req.body.username,
      password : md5(req.body.password)
  }
  const sql ='INSERT INTO users (username, password) VALUES (?,?)'
  const params =[data.username, data.password]
  db.run(sql, params, function (err) {
      if (err){
          res.status(400).json(errorJson(err.message))
          return;
      }
      res.status(201).json({
          "message": "success",
          "data": data,
          "id": this.lastID
      })
  });
})

// sign in and issue token
usersRouter.post("/signin", verifyUsername, verifyPassword, (req, res, next) => {
  // Issue token
  const payload = { username: req.username, userId: req.userId };
  const token = jwt.sign(payload, secret, {
    expiresIn: '4h'
  });
  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
});


// reissue token
// usersRouter.get("/reissuetoken", verifyToken, (req, res, next) => {
//   // Issue token
//   const payload = { username: req.username, userId: req.userId };
//   const token = jwt.sign(payload, secret, {
//     expiresIn: '4h'
//   });
//   res.cookie('token', token, { httpOnly: true }).sendStatus(200);
// });

// sign out and clear token
usersRouter.get("/signout", (req, res, next) => {
  res.status(200).clearCookie('token').send('cookie cleared')
})

// return user info
usersRouter.get("/userinfo", verifyToken, (req, res, next) => {
  const user = {
    "username": req.username,
    "userId": req.userId
  };
  
  res.status(200).json({
    "message":"success",
    "data":user,
  });
})


module.exports = usersRouter;
