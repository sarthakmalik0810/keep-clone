import React, { useContext, useState } from 'react';

const UserContext = React.createContext({
  name: '',
  email: '',
  isDarkMode: false,
  isListView: false,
  toggleDarkMode: () => {},
  toggleListMode: () => {},
});

export const UserContextProvider = ({ children, user }) => {
  const [isDarkMode, setIsDarkMode] = useState(user && user.isDarkMode);
  const [isListView, setIsListView] = useState(user && user.isListMode);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleListMode = () => {
    setIsListView(prevView => !prevView);
  };

  const userContext = {
    name: user && user.name,
    email: user && user.email,
    isDarkMode,
    isListView,
    toggleDarkMode,
    toggleListMode,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);
