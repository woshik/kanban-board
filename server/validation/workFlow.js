const Joi = require('joi');

const createWorkFlow = {
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title is required',
  }),
};

module.exports = {
  createWorkFlow,
};
