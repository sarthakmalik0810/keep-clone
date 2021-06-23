import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  makeStyles,
} from '@material-ui/core/';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import useInputValidation from '../../hooks/use-input';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useStyles = makeStyles(theme => ({
  boxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  textWelcome: {
    ...theme.custom.fontFamily.metropolis,
  },
  loginButtonRoot: {
    marginTop: theme.spacing(3),
  },
  loginButtonText: {
    ...theme.custom.fontFamily.metropolis,
    color: theme.palette.secondary.contrastText,
    textTransform: 'capitalize',
  },
  inputRoot: {
    '&$inputFocused $inputNotchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  inputNotchedOutline: {},
  inputFocused: {},
  inputLabelRoot: {
    '&$inputFocused': {
      color: theme.palette.secondary.main,
    },
  },
  textNotice: {
    ...theme.custom.fontFamily.roboto,
    lineHeight: 'unset',
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangedHandler,
    inputBlurHandler: emailInputOnBlurHandler,
  } = useInputValidation(value => emailRegex.test(value));

  const {
    value: passwordInputValue,
    isValid: passwordInputIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangedHandler,
    inputBlurHandler: passwordInputOnBlurHandler,
  } = useInputValidation(value => value.length > 5 && value.length < 20);

  let formIsValid = false;

  if (emailInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }

  const inputProps = {
    classes: {
      root: classes.inputRoot,
      notchedOutline: classes.inputNotchedOutline,
      focused: classes.inputFocused,
    },
  };
  const inputLabelProps = {
    classes: {
      root: classes.inputLabelRoot,
      focused: classes.inputFocused,
    },
  };

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const loginHandler = event => {
    event.preventDefault();
  };

  return (
    <Paper elevation={2}>
      <form onSubmit={loginHandler} className={classes.boxWrapper}>
        <Typography
          className={classes.textWelcome}
          color="textSecondary"
          variant="subtitle1"
        >
          Welcome to the Keep Clone
        </Typography>
        <TextField
          error={emailInputHasError}
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          value={emailInputValue}
          fullWidth
          margin="normal"
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
          onChange={emailInputChangedHandler}
          onBlur={emailInputOnBlurHandler}
        />

        <TextField
          error={passwordInputHasError}
          variant="outlined"
          label="Password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={passwordInputValue}
          onChange={passwordInputChangedHandler}
          onBlur={passwordInputOnBlurHandler}
          fullWidth
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
          margin="normal"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Button
          classes={{
            root: classes.loginButtonRoot,
            label: classes.loginButtonText,
          }}
          fullWidth
          color="secondary"
          variant="contained"
          disabled={!formIsValid}
        >
          LOG IN
        </Button>
      </form>
    </Paper>
  );
}

export default LoginForm;
