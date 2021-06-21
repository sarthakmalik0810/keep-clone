import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LoginForm from '../components/login/LoginForm';

const useStyles = makeStyles(theme => ({
  pageWrapper : {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default
  }
}))

function Login() {
  return (
    <div>
      <Container maxWidth="md">
        <LoginForm />
      </Container>
    </div>
  )
}

export default Login
