import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import { ThemeProvider } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main"></Redirect>
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
