import { useContext, useState } from 'react';
import { createContext } from 'react';

const UIContext = createContext({
  isNavBarOpen: true,
  noteInEditMode: '',
  selectedLabelId: '',
  toggleNavBar: () => {},
  setNoteInEditMode: () => {},
  setSelectedLabel: () => {},
});

export function UIContextProvider({ children }) {
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const [noteInEditMode, setNoteInEditMode] = useState('');
  const [selectedLabelId, setSelectedLabelId] = useState('');

  const toggleNavBar = () => {
    setIsNavBarOpen(prevState => !prevState);
  };

  const noteEdit = id => {
    setNoteInEditMode(id);
  };

  const labelSelect = id => {
    setSelectedLabelId(id);
  };

  const uiValue = {
    isNavBarOpen,
    noteInEditMode,
    selectedLabelId,
    toggleNavBar,
    noteEdit,
    labelSelect,
  };

  return <UIContext.Provider value={uiValue}>{children}</UIContext.Provider>;
}

export const useUIStore = () => useContext(UIContext);
