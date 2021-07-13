// Api end point file

const { createWorkFlow, createTask, validateId } = require('../validation');
const { convertMongoObjectId } = require('../middleware');
const validate = require('../validation/validate');

module.exports = {
  getWorkflow: {
    url: '/workflow',
    method: 'get',
    controller: 'workFlow',
    function: 'retrieve',
  },
  createWorkFlow: {
    url: '/workflow',
    method: 'post',
    controller: 'workFlow',
    function: 'create',
    middleware: [validate(createWorkFlow)],
  },
  addTask: {
    url: '/task/:workFlowId',
    method: 'post',
    controller: 'task',
    function: 'create',
    middleware: [
      validate(createTask, validateId('workFlowId')),
      convertMongoObjectId('workFlowId'),
    ],
  },

  updateTask: {
    url: '/task',
    method: 'patch',
    controller: 'task',
    function: 'update',
    middleware: [
      validate(
        validateId('taskId'),
        validateId('previousColumnId'),
        validateId('targetColumnId'),
      ),
      convertMongoObjectId('taskId'),
      convertMongoObjectId('previousColumnId'),
      convertMongoObjectId('targetColumnId'),
    ],
  },
};
