import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useUIStore } from '../../store/ui-context';
import useUser from '../../hooks/use-user';
import { useMutation, useQueryClient } from 'react-query';
import useTodos from '../../hooks/use-todos';
import useLabels from '../../hooks/use-labels';

function NotesArea() {
  const theme = useTheme();
  const {data: user, status: userStatus} = useUser();
  const {data: todos, status: todosStatus} = useTodos();
  const {data: labels, status: labelsStatus} = useLabels();
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
  if(todosStatus === 'success') {
    
  }

  return <div></div>;
}

export default NotesArea;
