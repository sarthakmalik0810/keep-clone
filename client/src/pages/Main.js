import { Box, Container } from '@material-ui/core';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';

import { useQuery } from 'react-query';
import { fetchLabels, fetchTodos, fetchUser } from '../api/api';
import NavBar from '../components/navigation/NavBar';
import NavDrawer from '../components/navigation/NavDrawer';
import NotesArea from '../components/todo/NotesArea';
import Loading from '../components/UI/Loading';
import AuthContext from '../store/auth-context';
import { LabelsContextProvider } from '../store/labels-context';
import { TodosContextProvider } from '../store/todos-context';
import { UserContextProvider, useUserStore } from '../store/user-context';
import { dark, light } from '../styles/theme';

function Main() {
  const { token } = useContext(AuthContext);
  const { status: todoStatus, data: todoData } = useQuery(
    ['get-todos', token],
    fetchTodos
  );
  const { status: labelStatus, data: labelData } = useQuery(
    ['get-labels', token],
    fetchLabels
  );
  const { status: userStatus, data: userData } = useQuery(
    ['get-user', token],
    fetchUser
  );

  if ([todoStatus, labelStatus, userStatus].includes('loading')) {
    return <Loading />;
  } else if (todoData && labelData && userData) {
    <MainComponent todos={todoData} labels={labelData} user={userData} />;
  }
}

function MainComponent({ todos, labels, user }) {
  return (
    <>
      <TodosContextProvider todos={todos}>
        <LabelsContextProvider labels={labels}>
          <UserContextProvider user={user}>
            <ThemeControlledComponent />
          </UserContextProvider>
        </LabelsContextProvider>
      </TodosContextProvider>
    </>
  );
}

function ThemeControlledComponent() {
  const [{ isDarkMode }] = useUserStore();

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <CssBaseline />
      <NavBar />
      <NavDrawer />
      <Container maxwidth={false}>
        <Box mt={8}>
          <NotesArea />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Main;
