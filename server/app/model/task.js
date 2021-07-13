const { ObjectId } = require('mongodb');
const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const addTask = asyncFunction(async ({ workFlowId, ...data }) => {
  const task = await getDB().collection('task');
  const taskData = { _id: ObjectId(), ...data };
  const result = await task.updateOne(
    {
      _id: workFlowId,
    },
    {
      $push: {
        task: taskData,
      },
    },
  );

  return result.modifiedCount === 1 ? taskData : null;
});

const updateTask = asyncFunction(
  async ({ taskId, previousColumnId, targetColumnId }) => {
    const task = await getDB().collection('task');
    const data = await task.findOne(
      {
        _id: previousColumnId,
      },
      {
        projection: {
          _id: 0,
          task: {
            $elemMatch: { _id: taskId },
          },
        },
      },
    );

    const selectedTask = data?.task?.[0] ?? null;

    if (selectedTask) {
      task.updateOne(
        {
          _id: previousColumnId,
        },
        {
          $pull: {
            task: { _id: taskId },
          },
        },
      );

      task.updateOne(
        {
          _id: targetColumnId,
        },
        {
          $push: {
            task: selectedTask,
          },
        },
      );
    } else {
      return false;
    }

    return true;
  },
);

module.exports = {
  addTask,
  updateTask,
};
