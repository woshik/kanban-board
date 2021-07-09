import React, { useRef } from 'react';
import './style.css';

export default function index({ task = {} }) {
  const draggableElement = useRef(null);

  const handleDragStart = (e) => {
    draggableElement.current.classList.add('dragging');
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragEnd = () => {
    draggableElement.current.classList.remove('dragging');
  };

  return (
    <div
      className="card text-white bg-secondary mb-3"
      ref={draggableElement}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-body">
        <p className="card-text">{task.name}</p>
      </div>
    </div>
  );
}
