import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LoginForm from '../components/login/LoginForm';
import useHttp from '../hooks/use-http';
import { login } from '../api/api';
import { useCallback } from 'react';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

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
  const { sendRequest, status, data: userData, error } = useHttp(login);
  const authCtx = useContext(AuthContext)

  const loginHandler = useCallback((email, password) => {
    sendRequest({email, password});
  }, [sendRequest]);

  if (status === 'pending') {
    console.log('making request');
  }

  if (status === 'completed' && userData) {

  }

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
