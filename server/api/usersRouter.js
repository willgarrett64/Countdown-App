const express = require('express');

//middleware
const jwt = require('jsonwebtoken');
const md5 = require('md5'); //md5 to hash passwords
const {verifyUser, verifyToken} = require('../utils/verification');

// connect to SQLite database
const db = require('../database/db')


const usersRouter = express.Router();

// TOKEN SECRET - WILL CHANGE AND HIDE
const secret = 'mysecretsshhh'; //temporary token string - WILL NEED TO HIDE

// create a new user account
usersRouter.post("/signup", (req, res, next) => {
  const errors=[]
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (!req.body.username){
      errors.push("No username specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  const data = {
      username: req.body.username,
      password : md5(req.body.password)
  }
  const sql ='INSERT INTO users (username, password) VALUES (?,?)'
  const params =[data.username, data.password]
  db.run(sql, params, function (err) {
      if (err){
          res.status(400).json({"error": err.message})
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
usersRouter.post("/signin", verifyUser, (req, res, next) => {
  // Issue token
  const payload = { username: req.username, userId: req.userId };
  const token = jwt.sign(payload, secret, {
    expiresIn: '1h'
  });
  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
});

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
