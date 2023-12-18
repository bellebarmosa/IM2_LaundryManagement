const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: 'Not authenticated' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    req.user = user; // Attach the user information to the request object
    next();
  });
};

module.exports = verifyToken;