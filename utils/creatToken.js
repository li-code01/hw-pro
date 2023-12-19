const jwt = require('jsonwebtoken');

function generateToken() {
  return jwt.sign({}, 'secretKey', { expiresIn: '15m' });
}

module.exports = {
  generateToken,
};