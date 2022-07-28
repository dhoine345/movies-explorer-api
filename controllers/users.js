const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleErrors, handleRequest } = require('../utils/utils');
const { resCodes, messages, mongoErrCodes } = require('../utils/constants');
const BadRequestError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(resCodes.CREATED_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.badRequest));
      } else if (err.code === mongoErrCodes.duplicateKey) {
        next(new ConflictError(messages.emailError));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => handleErrors(err, next));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => handleRequest(user, res, messages.userError))
    .catch((err) => handleErrors(err, next));
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => handleRequest(user, res, messages.userError))
    .catch((err) => {
      if (err.code === mongoErrCodes.duplicateKey) {
        next(new ConflictError(messages.emailError));
      }
      handleErrors(err, next)
    });
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getCurrentUser,
};
