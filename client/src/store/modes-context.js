import React, { useContext, useEffect, useState } from 'react';

import {
  saveDarkMode,
  loadDarkMode,
  loadListMode,
  saveListMode,
} from '../utils/local-storage';

const ModeContext = React.createContext({
  isDarkMode: false,
  isListView: false,
  toggleDarkMode: () => {},
  toggleListMode: () => {},
});

export const ModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    const darkMode = loadDarkMode();
    if (darkMode) {
      setIsDarkMode(darkMode);
    } else {
      setIsDarkMode(false);
    }

    const listView = loadListMode();
    if (listView) {
      setIsListView(listView);
    } else {
      setIsListView(false);
    }
  }, []);

  const toggleDarkMode = () => {
    saveDarkMode(isDarkMode);
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleListMode = () => {
    saveListMode(isListView);
    setIsListView(prevView => !prevView);
  };

  const modeContext = {
    isDarkMode,
    isListView,
    toggleDarkMode,
    toggleListMode,
  };

  return (
    <ModeContext.Provider value={modeContext}>{children}</ModeContext.Provider>
  );
};

const useModeStore = () => useContext(ModeContext);
