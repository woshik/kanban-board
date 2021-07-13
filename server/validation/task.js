const Joi = require('joi');

const createTask = {
  description: Joi.string().required().messages({
    'any.required': 'Task is required',
    'string.empty': 'Task is required',
  }),
};

module.exports = {
  createTask,
};
