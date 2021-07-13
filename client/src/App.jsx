import React, {
  Suspense, useState, useEffect, useRef,
} from 'react';
import SideBar from './components/SideBar';
import Board from './components/Board';
import WorkService from './services/workFlow.service';
import { WorkflowProvider } from './context/workflow';

const Modal = React.lazy(() => import('./components/Modal'));

const workService = new WorkService();

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [workFlow, setWorkFlow] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const inputEle = useRef(null);

  // initial server call to get work flow data
  useEffect(async () => {
    try {
      const data = await workService.get();
      setWorkFlow(data);
    } catch (error) {
      setWorkFlow([]);
    }
  }, []);

  const handleSideBarClick = () => {
    setModalShow(true);
  };

  const addWorkFlow = async () => {
    const value = inputEle.current.value.trim();
    if (!value) {
      setErrorMessage('Work flow title is empty');
      return;
    }

    try {
      const data = await workService.add({ title: value });
      setWorkFlow((preWorkFlow) => [...preWorkFlow, data]);
      setModalShow(false);
      setErrorMessage('');
      inputEle.current.value = '';
    } catch (error) {
      setErrorMessage(error?.message ?? 'Server Error, Try again');
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ padding: '4rem' }}>
        <SideBar onClick={handleSideBarClick} />
        <WorkflowProvider value={{ workFlow, setWorkFlow }}>
          <Board />
        </WorkflowProvider>
      </div>
      <Suspense fallback="">
        <Modal
          title="Add Work Flow"
          visible={modalShow}
          onSubmit={addWorkFlow}
          onCancel={() => setModalShow(false)}
          errorMessage={errorMessage}
        >
          <div className="form-group">
            <input
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
}

export default App;
