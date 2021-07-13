import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const Task = ({
  task,
  index,
  setSelectedTaskIndex,
  columnIndex,
  setSelectedColumnIndex,
}) => {
  const cardRef = useRef(null);

  const handleDragStart = () => {
    cardRef.current.classList.add(style.dragging);
    setSelectedTaskIndex(index);
    setSelectedColumnIndex(columnIndex);
  };

  const handleDragEnd = () => {
    cardRef.current.classList.remove(style.dragging);
    setSelectedTaskIndex(-1);
  };

  return (
    <div
      className="card text-white bg-secondary mb-3"
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-body">
        <p className="card-text">{task.description}</p>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setSelectedTaskIndex: PropTypes.func.isRequired,
  columnIndex: PropTypes.number.isRequired,
  setSelectedColumnIndex: PropTypes.func.isRequired,
};

export default Task;
