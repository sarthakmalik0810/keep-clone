import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
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
  );
}

export default App;
