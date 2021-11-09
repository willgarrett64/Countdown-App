const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


app.use('/', (req, res) => {
  res.send({
    token: 'test123'
  })
})


app.listen(3001, () => console.log(('Countdown App server running on Port:3001')));