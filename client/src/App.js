import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import { light } from './styles/theme';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Redirect to="/main"></Redirect>
        </Route>
        <Route path="/main">
          {authCtx.isLoggedIn && <Main />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/login">
            <Login />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/register">
            <Register />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/main" />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
