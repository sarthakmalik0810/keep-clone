import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LoginForm from '../components/login/LoginForm';

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
  const classes = useStyles();
  return (
    <div className={classes.pageWrapper}>
      <Container maxWidth="md" className={classes.pageContainer}>
        <LoginForm />
      </Container>
    </div>
  );
}

export default Login;
