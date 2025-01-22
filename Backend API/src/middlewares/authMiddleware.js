const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
