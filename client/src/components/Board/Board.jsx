import React, {
  Suspense, useContext, useState, useRef,
} from 'react';
import Category from '../Column';
import WorkflowContext from '../../context/workflow';
import TaskService from '../../services/task.service';
import style from './style.module.css';

const Modal = React.lazy(() => import('../Modal'));

let workFlowId = '';

const taskService = new TaskService();

const Board = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');
  const inputEle = useRef(null);

  const { workFlow, setWorkFlow } = useContext(WorkflowContext);

  const handleAddTaskClick = (id) => {
    workFlowId = id;
    setModalShow(true);
  };

  const addTask = async () => {
    const value = inputEle.current.value.trim();
    if (!value) {
      setErrorMessage('Task description is empty');
      return;
    }

    try {
      const data = await taskService.add(workFlowId, { description: value });
      setWorkFlow((preWorkFlow) => preWorkFlow.map((workflow) => {
        if (workflow._id === workFlowId) {
          workflow.task.push(data);
        }

        return workflow;
      }));

      setModalShow(false);
      setErrorMessage('');
      inputEle.current.value = '';
    } catch (error) {
      setErrorMessage(error?.message ?? 'Server Error, Try again');
    }
  };

  return (
    <>
      <div className="row flex-nowrap">
        {workFlow.map((category, index) => (
          <div key={category._id} className={style.col}>
            <Category
              category={category}
              columnIndex={index}
              selectedColumnIndex={selectedColumnIndex}
              setSelectedColumnIndex={setSelectedColumnIndex}
              selectedTaskIndex={selectedTaskIndex}
              setSelectedTaskIndex={setSelectedTaskIndex}
              onAddTaskClick={handleAddTaskClick}
            />
          </div>
        ))}
      </div>
      <Suspense fallback="">
        <Modal
          title="Add Task"
          visible={modalShow}
          onSubmit={addTask}
          errorMessage={errorMessage}
          onCancel={() => setModalShow(false)}
        >
          <div className="form-group">
            <textarea
              type="text"
              ref={inputEle}
              className="form-control"
              placeholder="Title"
            />
          </div>
        </Modal>
      </Suspense>
    </>
  );
};

export default Board;
