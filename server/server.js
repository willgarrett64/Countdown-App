const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');
const md5 = require('md5'); //md5 to hash passwords

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// //connect to SQLite database
// const sqlite = require('sqlite3').verbose();
// const db = new sqlite.Database("./database/user-countdowns.db", function (err) {  
//   if (err) {  
//     return console.error(err);  
//   } else {  
//     console.log("Connected to the sqlite-db.");  
//   }
// });


const PORT = process.env.PORT || 4001;

//Mount the api router at the '/api' path (CURRENTLY NOT WORKING DUE TO ACCESSING SQLite DB FROM ROUTE FILES)
const apiRouter = require('./api/apiRouter');
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  const sql = 'select * from users';
  const params = [];
  db.all(sql, params, (err, result) => {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({
      "message": "success",
      "data": result,
    })
  })
})

//add new user
app.post("/api/user", (req, res, next) => {
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

const secret = 'mysecretsshhh'; //temporary token string

app.get("/api/user", (req, res, next) => {
  const data = {
    username: req.body.username,
    password : md5(req.body.password)
  }
  const sql = "select * from users where username = ? and password = ?"
  const params =[data.username, data.password]
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


app.listen(PORT, () => console.log((`Countdown app server is listening on port ${PORT}`)));