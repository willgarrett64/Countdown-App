const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh'; //temporary token string - WILL NEED TO HIDE
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.username = decoded.username;
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

module.exports = {verifyToken}