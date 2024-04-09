const { celebrate, Joi } = require('celebrate');

module.exports.registerValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    debtAmount: Joi.string().allow(null, ''),
    payDelay: Joi.string().allow(null, ''),
    payToOneCreditor: Joi.string().allow(null, ''),
    additionalQuestion1: Joi.string().allow(null, ''),
    additionalQuestion2: Joi.string().allow(null, ''),
    additionalQuestion3: Joi.string().allow(null, ''),
    additionalQuestion4: Joi.string().allow(null, ''),
    bankruptcyConclusion: Joi.string().allow(null, ''),
  }),
});

module.exports.authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});
