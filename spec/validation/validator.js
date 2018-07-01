const Joi = require('joi');

exports.create = {
  params: {
    from: Joi.string().regex(/[A-Z]/).required(),
    to: Joi.string().regex(/[A-Z]/).required(),
    amount: Joi.number()
  }
};

module.exports = exports;