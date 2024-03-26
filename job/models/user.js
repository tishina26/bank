const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const { BAD_EMAIL, BAD_EMAIL_OR_PASSWORD } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: BAD_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  debtAmount: {
    type: String,
    required: false,
  },
  payDelay: {
    type: String,
    required: false,
  },
  payToOneCreditor: {
    type: String,
    required: false,
  },
  additionalQuestion1: {
    type: String,
    required: false,
  },
  additionalQuestion2: {
    type: String,
    required: false,
  },
  additionalQuestion3: {
    type: String,
    required: false,
  },
  additionalQuestion4: {
    type: String,
    required: false,
  },
  bankruptcyConclusion: {
    type: String,
    required: false,
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(BAD_EMAIL_OR_PASSWORD);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(BAD_EMAIL_OR_PASSWORD);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
