import {
  ClickAwayListener,
  makeStyles,
  Paper,
  useTheme,
} from '@material-ui/core';
import { useState } from 'react';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: theme.custom.palette.itemBorderColor,
    borderWidth: theme.spacing(0.1),
    borderStyle: 'solid',
  },
  textTitle: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18),
  },
  barWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
  },
}));

function ToDoItem({ noteItem, isEditMode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [color, setColor] = useState(noteItem.color);
  const [title, setTitle] = useState(noteItem.title);
  const [isCheckboxMode, setIsCheckboxMode] = useState(noteItem.isCheckboxMode);
  const [labels, setLabels] = useState(noteItem.labels);
  const classes = useStyles();
  const theme = useTheme();

  const onAfterEdit = () => {};

  return (
    <Paper
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classes.wrapper}
      elevation={isHovered || isEditMode ? 2 : 0}
      style={{ backgroundColor: theme.custom.palette.noteBackground[color] }}
    >
      <ClickAwayListener
        onClickAway={isEditMode ? () => onAfterEdit() : () => {}}
      >
        <div>
          <Title title={title} setTitle={setTitle} isEditMode={isEditMode} />
        </div>
      </ClickAwayListener>
    </Paper>
  );
}

export default ToDoItem;
