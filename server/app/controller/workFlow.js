const {
  getWorkFlow,
  addWorkFlow,
} = require('../model/workFlow');

const retrieve = async (req, res) => res.json(await getWorkFlow());

const create = async (req, res) => {
  const result = await addWorkFlow(req.routeData);
  if (result) {
    res.status(201).json(result);
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

module.exports = {
  retrieve,
  create,
};
