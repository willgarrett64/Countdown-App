const express = require('express');

// connect to SQLite database
const db = require('../database/db')



const countdownsRouter = express.Router();


countdownsRouter.use('/', (req, res, next) => {
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

module.exports = countdownsRouter;
