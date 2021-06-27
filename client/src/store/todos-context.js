import React, { useReducer, useContext } from 'react';
import reducer from './shared-reducer';

const TodosContext = React.createContext({});

export const TodosContextProvider = ({ children, todos }) => {
  const [state, dispatch] = useReducer(reducer, todos);
  return (
    <TodosContext.Provider value={[state, dispatch]}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosStore = () => useContext(TodosContext);
