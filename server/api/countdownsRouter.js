const express = require('express');

// connect to SQLite database
const db = require('../database/db')

//middleware
const {verifyToken} = require('../utils/verification');


const countdownsRouter = express.Router();

// get all countdowns
countdownsRouter.get('/all', (req, res, next) => {
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

// get all guest countdowns
countdownsRouter.get('/guest', (req, res, next) => {
  const sql = "select * from countdowns where user_id is NULL";
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

// get a users countdowns
countdownsRouter.get('/mycountdowns', verifyToken, (req, res, next) => {
  const userId = req.userId;
  const sql = "select * from countdowns where user_id = ?";
  const params = [userId];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows,
        "username": req.username

    })
  });
})

// get countdown by ID
countdownsRouter.get('/:id', (req, res, next) => {
  const countdownId = req.params.id;
  const sql = "select * from countdowns where id = ?";
  const params = [countdownId];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows,
    })
  });
})

// create new countdown
countdownsRouter.post('/', verifyToken, (req, res, next) => {
  const userId = req.userId;
  const countdown = req.body;
  
  const errors=[]
  if (!countdown.name){
      errors.push("No countdown name specified");
  }
  if (!countdown.date){
      errors.push("No countdown date specified");
  }
  if (!countdown.time){
    errors.push("No countdown time specified");
}
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }

  const sql = "INSERT INTO countdowns (user_id, name, date, time) VALUES (?, ?, ?, ?)";
  const params = [userId, countdown.name, countdown.date, countdown.time];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }

    res.json({
        "message":"success",
        "data":{countdown},
        "id":this.lastID,
    })
  });
})

// delete countdown by ID
countdownsRouter.delete('/', verifyToken, (req, res, next) => {
  const countdownId = req.body.id;
  const userId = req.userId;

  const sql = "DELETE FROM countdowns WHERE id = ? AND user_id = ?";
  const params = [countdownId, userId];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": countdownId
    })
  })
})

module.exports = countdownsRouter;
