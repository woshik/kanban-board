import React from 'react';

export default function index({ category = {}, setTaskList, children }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
    setTaskList((preTaskList) => (
      preTaskList.map((task) => (task.id === id ? { ...task, category_id: category.id } : task))
    ));
  };

  return (
    <>
      <div
        className="card h-100 w-100 d-inline-block"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h5 className="card-header text-center">{category.title}</h5>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}
