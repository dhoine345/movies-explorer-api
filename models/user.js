const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { messages } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function func(email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.emailOrPasswordErr);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.emailOrPasswordErr);
          }

          return user;
        });
    })
    .catch(next);
};

userSchema.set('toJSON', {
  transform(doc, ret) {
    const user = ret;
    delete user.password;
    return ret;
  },
});

module.exports = mongoose.model('user', userSchema);
