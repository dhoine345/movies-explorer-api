const { resCodes } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = resCodes.UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedError;
