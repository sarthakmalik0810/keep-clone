import React from 'react';

import {
  useTheme,
  makeStyles,
  Popover,
  Avatar,
  Typography,
  Divider, Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { Face } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  popover: {
    background: theme.custom.palette.profilePopColor,
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius,
  },
  container: {
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(1),
    background: theme.palette.background.default,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
  },
  userName: {
    ...theme.custom.fontFamily.metropolis,
    fontSize: '1rem',
    fontWeight: 500,
  },
  userEmail: {
    ...theme.custom.fontFamily.roboto,
    fontSize: '0.9rem',
  },
  bar: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignout: {
    ...theme.custom.fontFamily.metropolis,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 2),
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'none',
  }
}));

function ProfilePopover({ anchorEl, isOpen, onClose, user, onLogout }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const id = isOpen ? 'profile-popover' : undefined;

  const logoutHandler = () => {
    onLogout();
    history.replace('/login');
    return(<></>)
  }

  return (
    <div>
      <Popover
        id={id}
        anchorEl={anchorEl}
        onClose={onClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
        paper: classes.popover
        }}
      >
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <Face htmlColor={theme.custom.palette.iconColor} fontSize="large" />
          </Avatar>
          <div className={classes.userInfo}>
            <Typography
              className={classes.userName}
              variant="h6"
              component="span"
              color="textPrimary"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.userEmail}
              variant="body1"
              component="span"
              color="textSecondary"
            >
              {user.email}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.bar}>
          <Button variant="outlined" size="small" onClick={logoutHandler} classes={{ root: classes.buttonSignout }}>Sign out</Button>
        </div>
      </Popover>
    </div>
  );
}

export default ProfilePopover;
