import { useState } from 'react';

import { getUser, removeUser, saveUser } from '../utils/local-storage';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = token => {
    setToken(token);
    saveUser(token);
  };

  const logoutHandler = () => {
    setToken(null);
    removeUser();
  };

  const user = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
