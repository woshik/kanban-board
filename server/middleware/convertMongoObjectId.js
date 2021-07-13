const { ObjectId } = require('mongodb');

// convert id into mongoDB id object
const convertMongoObjectId = (key = 'id') => (req, _, next) => {
  if (req?.validationResult?.value?.[key]) {
    try {
      req.validationResult.value[key] = ObjectId(req.validationResult.value[key]);
      next();
    } catch (error) {
      next(error);
    }

    return;
  }

  next(new Error('Id not found'));
};

module.exports = convertMongoObjectId;
