import { Box, Container } from '@material-ui/core';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/navbar/NavBar';
import NavDrawer from '../components/navdrawer/NavDrawer';
import NotesArea from '../components/todo/NotesArea';
import Loading from '../components/UI/Loading';
import useUser from '../hooks/use-user';
import { dark, light } from '../styles/theme';

function Main() {
  const { data: user, status: userStatus } = useUser();
  return (
    <>
      {userStatus === 'loading' && <Loading />}
      {user && userStatus === 'success' && (
        <ThemeProvider theme={user.isDarkMode ? dark : light}>
          <CssBaseline />
          <NavBar />
          <NavDrawer />
          <Container maxwidth={false}>
            <Box mt={8}>
              <NotesArea />
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export default Main;
