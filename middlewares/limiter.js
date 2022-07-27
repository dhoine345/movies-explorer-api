const rateLimit = require('express-rate-limit');
const { message } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: message.tooMuchRequestsErr,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
