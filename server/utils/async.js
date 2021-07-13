const logger = require('./serverErrorLogger');

const asyncController = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    logger.error({ label: 'server error', message: err.stack });
    next(new Error(err));
  }
};

const asyncFunction = (handler) => async (...args) => {
  try {
    return await handler(...args);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  asyncController,
  asyncFunction,
};
