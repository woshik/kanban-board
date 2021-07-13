const Joi = require('joi');
const { createWorkFlow } = require('./workFlow');
const { createTask } = require('./task');

const validateId = (key = 'id') => ({
  [key]: Joi.string().required().messages({
    'any.required': `${key} is required`,
    'string.empty': `${key} is required`,
  }),
});

module.exports = {
  createWorkFlow,
  createTask,
  validateId,
};
