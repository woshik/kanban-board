const Joi = require('joi');

const validate = (...validationRules) => {
  let allRules = {};

  validationRules.forEach((rule) => {
    allRules = {
      ...allRules,
      ...rule,
    };
  });

  return (req, res, next) => {
    const joiSchema = Joi.object(allRules);
    req.validationResult = joiSchema.validate(req.routeData);

    next();
  };
};

module.exports = validate;
