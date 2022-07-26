const { regexUrl } = require('./constants');

function validateUrl(v) {
  return regexUrl.test(v);
}

module.exports = {
  validateUrl,
};
