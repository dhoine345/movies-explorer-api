const { regexUrl } = require('./constants');
const { resCodes, messages } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');

function validateUrl(v) {
  return regexUrl.test(v);
}

function handleErrors(err, next) {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(messages.badRequest));
    return;
  }
  next(err);
}

function handleRequest(item, res, message) {
  if (!item) {
    throw new NotFoundError(message);
  }
  res.status(resCodes.OK_CODE).send({ data: item });
}

module.exports = {
  validateUrl,
  handleErrors,
  handleRequest,
};
