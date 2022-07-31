const jwt = require('jsonwebtoken');
const { messages, devKey } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : devKey);
  } catch (err) {
    next(new UnauthorizedError(messages.unauthorized));
    return;
  }

  req.user = payload;
  next();
};
