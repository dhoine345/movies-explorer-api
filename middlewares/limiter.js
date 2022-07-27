const rateLimit = require('express-rate-limit');
const { messages } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: messages.tooMuchRequestsErr,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
