import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import WorkflowContext from '../../context/workflow';
import TaskService from '../../services/task.service';
import Task from '../Task';

const taskService = new TaskService();

const Column = ({
  category,
  columnIndex,
  onAddTaskClick,
  selectedColumnIndex,
  setSelectedColumnIndex,
  selectedTaskIndex,
  setSelectedTaskIndex,
}) => {
  const { setWorkFlow } = useContext(WorkflowContext);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    setWorkFlow((preWorkFlow) => {
      if (selectedColumnIndex !== columnIndex) {
        const task = preWorkFlow[selectedColumnIndex].task.splice(selectedTaskIndex, 1);
        preWorkFlow[columnIndex].task.push(
          ...task,
        );

        taskService.update({
          taskId: task[0]?._id,
          previousColumnId: preWorkFlow[selectedColumnIndex]._id,
          targetColumnId: preWorkFlow[columnIndex]._id,
        });
      }

      return preWorkFlow;
    });
  };

  return (
    <>
      <div
        className="card h-100 w-100 d-inline-block"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h5 className="card-header d-flex justify-content-between">
          {category.title}
          {columnIndex === 0 ? (
            <span
              tabIndex="-1"
              role="button"
              onClick={() => onAddTaskClick(category._id)}
              onKeyPress={() => onAddTaskClick(category._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </span>
          ) : null}
        </h5>
        <div className="card-body">
          {category?.task?.map((task, taskIndex) => (
            <Task
              key={task._id}
              task={task}
              index={taskIndex}
              columnIndex={columnIndex}
              setSelectedTaskIndex={setSelectedTaskIndex}
              setSelectedColumnIndex={setSelectedColumnIndex}
            />
          )) ?? null}
        </div>
      </div>
    </>
  );
};

Column.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    task: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
  columnIndex: PropTypes.number.isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  setSelectedColumnIndex: PropTypes.func.isRequired,
  selectedTaskIndex: PropTypes.number.isRequired,
  setSelectedTaskIndex: PropTypes.func.isRequired,
  onAddTaskClick: PropTypes.func.isRequired,
};

export default Column;
