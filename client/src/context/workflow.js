import { createContext } from 'react';

const context = createContext([]);

const WorkflowProvider = context.Provider;
const WorkflowConsumer = context.Consumer;

export { WorkflowProvider, WorkflowConsumer };

export default context;
