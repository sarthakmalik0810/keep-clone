import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core/';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useInputValidation from '../../hooks/use-input';

const useStyles = makeStyles(theme => ({}));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangedHandler,
    inputBlurHandler: emailInputOnBlurHandler,
    
  } = useInputValidation(emailRegex.test(value));

  const loginHandler = event => {
    event.preventDefault();
  };

  return (
    <Paper elevation={2}>
      <Typography>Welcome to the Keep Clone</Typography>
      <form>
        <TextField id="email" type="email" label="Email" variant="outlined" />
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <Visibility></Visibility>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    </Paper>
  );
}

export default LoginForm;
