const express = require('express');

// connect to SQLite database
const db = require('../database/db')


const usersRouter = express.Router();

usersRouter.use('/', (req, res, next) => {
  const sql = "select * from users";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows
    })
  });
})


//add new user
usersRouter.post("/", (req, res, next) => {
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
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})


//authenticate and issue token
const secret = 'mysecretsshhh'; //temporary token string - WILL NEED TO HIDE

usersRouter.get("/", (req, res, next) => {
  const data = {
    username: req.body.username,
    password : md5(req.body.password)
  }
  const sql = "select * from users where username = ? and password = ?"
  const params =[data.username, data.password];
  db.get(sql, params, (err, row) => {
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


module.exports = usersRouter;
