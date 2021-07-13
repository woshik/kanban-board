const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const addWorkFlow = asyncFunction(async (data) => {
  const workFlow = await getDB().collection('task');
  const result = await workFlow.insertOne({ ...data, task: [] });
  return result.insertedCount === 1 ? result.ops[0] : null;
});

const getWorkFlow = asyncFunction(async () => {
  const workFlow = await getDB().collection('task');
  const result = await workFlow.find().toArray();
  return result;
});

module.exports = {
  getWorkFlow,
  addWorkFlow,
};
