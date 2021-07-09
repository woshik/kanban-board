import React, { useState, useEffect } from 'react';
import Category from '../Category';
import AddTask from '../AddTask';
import Task from '../Task';

export default function index() {
  const [categoryList] = useState([
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Done' },
  ]);

  const [taskEle, setTaskEle] = useState({});

  const [taskList, setTaskList] = useState([
    { id: 1, category_id: 1, name: 'this is sample task 1' },
    { id: 2, category_id: 2, name: 'this is sample task 2' },
    { id: 3, category_id: 2, name: 'this is sample task 3' },
    { id: 4, category_id: 1, name: 'this is sample task 4' },
    { id: 5, category_id: 3, name: 'this is sample task 5' },
    { id: 6, category_id: 2, name: 'this is sample task 6' },
    { id: 7, category_id: 1, name: 'this is sample task 7' },
    { id: 8, category_id: 1, name: 'this is sample task 8' },
    { id: 9, category_id: 3, name: 'this is sample task 9' },
    { id: 10, category_id: 3, name: 'this is sample task 10' },
    { id: 11, category_id: 2, name: 'this is sample task 11' },
  ]);

  useEffect(() => {
    setTaskEle({});
    taskList.forEach((task) => {
      setTaskEle((preTaskEle) => ({
        ...preTaskEle,
        [task.category_id]: preTaskEle[task.category_id]
          ? [
            ...preTaskEle[task.category_id],
            <Task key={task.id} task={task} />,
          ]
          : [<Task key={task.id} task={task} />],
      }));
    });
  }, [taskList]);

  return (
    <div className="container mt-5 mb-5">
      <AddTask />
      <div className="row">
        {categoryList.map((category) => (
          <div key={category.id} className="col-4">
            <Category category={category} setTaskList={setTaskList}>
              {taskEle[category.id]}
            </Category>
          </div>
        ))}
      </div>
    </div>
  );
}
