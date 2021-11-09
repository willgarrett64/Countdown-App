const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');

//connect to SQLite database
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./database/user-countdowns.db", function (err) {  
  if (err) {  
    return console.error(err);  
  } else {  
    console.log("Connected to the sqlite-db.");  
  }
});


const PORT = process.env.PORT || 4001;


// app.use('/', (req, res) => {
//   res.
// })


app.use('/api/users', (req, res, next) => {
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


app.use('/api/countdowns', (req, res, next) => {
  const sql = "select * from countdowns";
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




app.listen(PORT, () => console.log((`Countdown app server is listening on port ${PORT}`)));