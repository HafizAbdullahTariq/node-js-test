const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('config/private.key', 'utf8');
const publicKey = fs.readFileSync('config/public.key', 'utf8');

const options = {
  issuer: 'TEST',
  audience: 'https://www.testing.com',
  expiresIn: '12h',
  algorithm: 'RS256',
};
const sign = (payload) => {
  return jwt.sign(payload, privateKey, options);
};

const verify = (token) => {
  try {
    return jwt.verify(token, publicKey, options);
  } catch (error) {
    return false;
  }
};

const decode = (token) => {
  return jwt.decode(token, { complete: true });
};

module.exports = { sign, verify, decode };
