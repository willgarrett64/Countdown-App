const express = require('express');

// middleware
const cors = require('cors');
const jwt = require('jsonwebtoken');
const md5 = require('md5'); //md5 to hash passwords
const cookieParser = require('cookie-parser');

const app = express();  

app.use(cors());
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 4001;

//Mount the api router at the '/api' path
const apiRouter = require('./api/apiRouter');
app.use('/api', apiRouter);


app.listen(PORT, () => console.log((`Countdown app server is listening on port ${PORT}`)));