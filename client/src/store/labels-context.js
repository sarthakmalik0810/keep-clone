import React, { useReducer, useContext } from 'react';
import reducer from './shared-reducer';

const LabelsContext = React.createContext({});

export const LabelsContextProvider = ({ children, labels }) => {
  const [state, dispatch] = useReducer(reducer, labels);
  return (
    <LabelsContext.Provider value={[state, dispatch]}>
      {children}
    </LabelsContext.Provider>
  );
};

export const useLabelsStore = () => useContext(LabelsContext);
