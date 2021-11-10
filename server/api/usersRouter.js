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
      const payload = { username: data.username, userId: row.id };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      console.log(`${data.username} signed in: id: ${row.id}`); //inform of user signed in
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
});

usersRouter.post("/signout", (req, res, next) => {
  res.status(202).clearCookie('token').send('cookie cleared')
})


// usersRouter.get("/userarea", verifyToken, (req, res, next) => {
//   res.sendStatus(200);
// })


module.exports = usersRouter;
