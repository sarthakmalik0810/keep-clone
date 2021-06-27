import { useContext } from 'react';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LoginForm from '../components/login/LoginForm';
import useHttp from '../hooks/use-http';
import { login } from '../api/api';
import AuthContext from '../store/auth-context';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  pageWrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: '1',
  },
}));

function Login() {
  const history = useHistory();
  const {login: loginContext} = useContext(AuthContext);
  const { sendRequest, status, data: userData, error } = useHttp(login);

  const loginHandler = (email, password) => {
    sendRequest({ email, password });
  };

  if (status === 'pending') {
    console.log('making request');
  }

  useEffect(() => {
    if (status === 'completed' && userData) {
      const expirationTime = new Date(new Date().getTime() + (+userData.user.expiresIn * 1000))
      loginContext(userData.token, expirationTime.toISOString());
      history.replace('/');
    }
  }, [status, userData, loginContext, history]);

  if (status === 'completed' && error) {
    console.log(error);
  }

  const classes = useStyles();
  return (
    <div className={classes.pageWrapper}>
      <Container maxWidth="md" className={classes.pageContainer}>
        <LoginForm status={status} onLoginHandler={loginHandler} />
      </Container>
    </div>
  );
}

export default Login;
