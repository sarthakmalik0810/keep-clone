import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useUIStore } from '../../store/ui-context';
import useUser from '../../hooks/use-user';
import { useMutation, useQueryClient } from 'react-query';
import useTodos from '../../hooks/use-todos';
import useLabels from '../../hooks/use-labels';
import { useRef } from 'react';

import ToDoItem from './ToDoItem';
const useStyles = makeStyles(theme => ({
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.mixins.drawer.minWidth - theme.spacing(2.5),
    marginRight: -1 * theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  todoCreateContainer: {
    display: 'flex',
    padding: theme.spacing(4, 0),
    margin: theme.spacing(0, 1),
  },
  todoCreateWrapper: {
    flex: 1,
    maxWidth: theme.spacing(75),
    margin: '0 auto',
  },
  todosWrapper: {
    margin: '0 auto',
    columnWidth: theme.spacing(29),
    columnGap: '0.5rem',
  },
  todoWrapper: {
    width: theme.spacing(29),
    margin: '0 auto',
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    padding: '0.5rem 0',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },
}));

function NotesArea() {
  const classes = useStyles();
  const theme = useTheme();
  const { data: user, status: userStatus } = useUser();
  const { data: todos, status: todosStatus } = useTodos();
  const { data: labels, status: labelsStatus } = useLabels();
  const { isNavBarOpen, noteInEditMode, selectedLabelId } = useUIStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));
  const isLaptopL = useMediaQuery(theme.breakpoints.up('lg'));
  const is4K = useMediaQuery(theme.breakpoints.up('xl'));
  const numberOfColumns = is4K
    ? 8
    : isLaptopL
    ? 4
    : isLaptop
    ? 3
    : isTablet
    ? 2
    : 1;
  let width = is4K
    ? '100%'
    : isLaptopL
    ? '1000px'
    : isLaptop
    ? '730px'
    : isTablet
    ? '480px'
    : '100%';
  width = user.isListMode
    ? isLaptop || isLaptopL
      ? theme.spacing(75)
      : '100%'
    : width;

  let filteredItems = [];

  if (todosStatus === 'success') {
    filteredItems = todos.data.filter(todo => {
      if (selectedLabelId !== '') {
        return todo.labels.some(label => label._id === selectedLabelId);
      } else {
        return true;
      }
    });
  }
  return (
    <main>
      <div
        className={
          isMobile || !isNavBarOpen ? classes.contentShift : classes.content
        }
      >
        <div className={classes.todoCreateContainer}>
          <div className={classes.todoCreateWrapper}>{/* {Todo Create} */}</div>
        </div>
        <div
          className={classes.todosWrapper}
          style={{
            columnCount: user.isListMode ? 1 : numberOfColumns,
            width: width,
          }}
        >
          {filteredItems.map(noteItem => {
            return (
              <div
                key={noteItem._id}
                className={classes.todoWrapper}
                style={{ width: isMobile || user.isListMode ? '100%' : null }}
              >
                <ToDoItem
                  noteItem={noteItem}
                  isEditMode={noteInEditMode === noteItem._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default NotesArea;
