const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if no token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const secret = process.env.jwtSecret;
    const decoded = jwt.verify(token, secret);

    // Add the user from the token payload to the request object for future use
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
