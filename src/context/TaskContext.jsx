import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskUpdate, setTaskUpdate] = useState(0);

  const triggerTaskUpdate = () => {
    setTaskUpdate(prev => prev + 1);
  };

  return (
    <TaskContext.Provider value={{ taskUpdate, triggerTaskUpdate }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskUpdate = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskUpdate must be used within a TaskProvider');
  }
  return context;
};