const validator = require('validator');
const { resCodes, messages } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');

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

function validateUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(messages.badRequest);
}

module.exports = {
  handleErrors,
  handleRequest,
  validateUrl,
};
