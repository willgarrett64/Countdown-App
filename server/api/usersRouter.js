const express = require('express');

//middleware
const jwt = require('jsonwebtoken');
const md5 = require('md5'); //md5 to hash passwords

// connect to SQLite database
const db = require('../database/db')


const usersRouter = express.Router();

// return all users
// usersRouter.use('/', (req, res, next) => {
//   const sql = "select * from users";
//   const params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({"error":err.message});
//       return;
//     }
//     res.json({
//         "message":"success",
//         "data":rows
//     })
//   });
// })


// add new user
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
  const query ='INSERT INTO users (username, password) VALUES (?,?)'
  const params =[data.username, data.password]
  db.run(query, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id": this.lastID
      })
  });
})


// issue token
const secret = 'mysecretsshhh'; //temporary token string - WILL NEED TO HIDE

usersRouter.post("/signin", (req, res, next) => {
  const data = {
    username: req.body.username,
    password : md5(req.body.password)
  }
  const query = "select * from users where username = ? and password = ?"
  const params =[data.username, data.password];
  db.get(query, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      if (!row) {
        res.status(401).json({"error": 'Incorrect email or password'});
        return
      }
      // Issue token
      const payload = { username: data.username };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
});


const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
}

usersRouter.get("/userarea", withAuth, (req, res, next) => {
  res.sendStatus(200);
})


module.exports = usersRouter;
