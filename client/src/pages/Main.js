import React from 'react';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

function Main() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <div>Main content</div>
      {isLoggedIn && <p>Logged In</p>}
      <button onClick={() => logout()}>Log Out</button>
    </>
  );
}

export default Main;
