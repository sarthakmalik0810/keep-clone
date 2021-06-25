import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';

import {
  getUser,
  removeUser,
  saveUser,
  getExpirationTime,
  clearExpirationTime,
  setExpirationTime,
} from '../utils/local-storage';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: ({ token, user }) => {},
  logout: () => {},
});

let logoutTimer;

const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = getUser();
  const storedExpirationDate = getExpirationTime();

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60) {
    removeUser();
    clearExpirationTime();
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();

  let initialToken = '';
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    removeUser();
    clearExpirationTime();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = ({ token, user }) => {
    setToken(token);
    saveUser(token);
    setExpirationTime(user.expiresIn);

    const remainingTime = calculateRemainingTime(user.expiresIn);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const user = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
