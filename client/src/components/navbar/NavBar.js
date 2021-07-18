import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import {
  Menu,
  Brightness3,
  Brightness7,
  DashboardOutlined as NormalViewIcon,
  ViewAgendaOutlined as ListViewIcon,
  AccountCircle,
} from '@material-ui/icons';
import React, { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserApi } from '../../api/api';
import useUser from '../../hooks/use-user';
import AuthContext from '../../store/auth-context';
import { useUIStore } from '../../store/ui-context';
import ProfilePopover from './ProfilePopover';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  containerBorder: {
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.divider,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    ...theme.custom.fontFamily.metropolis,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function NavBar() {
  const profileIconRef = useRef();
  const theme = useTheme();
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { toggleNavBar } = useUIStore();
  const queryClient = useQueryClient();
  const { data: user, status: userStatus } = useUser();
  const { logout: logoutContext } = useContext(AuthContext);
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const updateUser = useMutation(updateUserApi, {
    onMutate: user => {
      const previousValue = queryClient.getQueryData('user');
      queryClient.setQueryData('user', old => ({ ...old, ...user }));
      return previousValue;
    },
    onError: (err, user, previousValue) => {
      queryClient.setQueryData('user', previousValue);
      console.log(err);
    },
  });

  const toggleDarkModeHandler = () => {
    updateUser.mutate({ isDarkMode: !user.isDarkMode });
  };

  const toggleListViewHandler = () => {
    updateUser.mutate({ isListMode: !user.isListMode });
  };

  const darkLightModeIcon = user.isDarkMode ? (
    <IconButton onClick={toggleDarkModeHandler}>
      <Brightness7 htmlColor={theme.custom.palette.iconColor} />
    </IconButton>
  ) : (
    <IconButton onClick={toggleDarkModeHandler}>
      <Brightness3 htmlColor={theme.custom.palette.iconColor} />
    </IconButton>
  );

  const listModeIcon = user.isListMode ? (
    <IconButton onClick={toggleListViewHandler}>
      <NormalViewIcon htmlColor={theme.custom.palette.iconColor} />
    </IconButton>
  ) : (
    <IconButton onClick={toggleListViewHandler}>
      <ListViewIcon htmlColor={theme.custom.palette.iconColor} />
    </IconButton>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        elevation={trigger ? 4 : 0}
        className={trigger ? null : classes.containerBorder}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleNavBar}
          >
            <Menu htmlColor={theme.custom.palette.iconColor} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Notes
          </Typography>
          <div className={classes.grow} />
          {darkLightModeIcon}
          {listModeIcon}
          <IconButton
            onClick={() => setShowProfilePopover(prevState => !prevState)}
            ref={profileIconRef}
            aria-haspopup="true"
          >
            <AccountCircle htmlColor={theme.custom.palette.iconColor} />
          </IconButton>
        </Toolbar>
        <ProfilePopover
          anchorEl={profileIconRef.current}
          isOpen={showProfilePopover}
          onClose={() => setShowProfilePopover(false)}
          user={user}
          onLogout={logoutContext}
          status={userStatus}
        />
      </AppBar>
    </div>
  );
}

export default NavBar;
