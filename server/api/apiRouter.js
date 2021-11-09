const express = require('express');
const apiRouter = express.Router();



const usersRouter = require('./usersRouter.js');
apiRouter.use('/users', usersRouter);


const countdownsRouter = require('./countdownsRouter.js');
apiRouter.use('/countdowns', countdownsRouter);


module.exports = apiRouter;
