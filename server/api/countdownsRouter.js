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

// get specific countdown by ID
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

module.exports = countdownsRouter;
