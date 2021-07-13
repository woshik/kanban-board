const { addTask, updateTask } = require('../model/task');

const create = async (req, res) => {
  const result = await addTask(req.routeData);
  if (result) {
    res.status(201).json(result);
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const update = async (req, res) => {
  if (await updateTask(req.routeData)) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

module.exports = {
  create,
  update,
};
