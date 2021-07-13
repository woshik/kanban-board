const checkValidation = (req, res, next) => {
  if (req.validationResult) {
    if (req.validationResult.error) {
      const returnData = {
        ...req.validationResult.error.details[0].context,
        message: req.validationResult.error.details[0].message,
      };

      if (process.env.NODE_ENV !== 'production') {
        returnData.details = { ...req.validationResult.error.details[0] };
      }

      return res.status(422).json(returnData);
    }
    req.routeData = req.validationResult.value;
    delete req.validationResult;
  }

  next();
};

module.exports = checkValidation;
