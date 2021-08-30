import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/styles';

import { CheckBox, InputBase, IconButton } from '@material-ui/core';
import {
  AddOutlined,
  CheckBoxOutlined,
  CheckBoxOutlineBlankOutlined,
  CloseOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  itemContainerWithBorder: {
    borderStyle: 'solid',
    borderWidth: `${theme.spacing(0.1)}px 0 ${theme.spacing(0.1)}px 0`,
    borderColor: theme.palette.divider,
  },
  itemContainerWithoutBorder: {
    borderStyle: 'solid',
    borderWidth: `${theme.spacing(0.1)}px 0 ${theme.spacing(0.1)}px 0`,
    borderColor: 'transparent',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    minHeight: theme.spacing(4),
  },
  inputRoot: {
    flex: 1,
  },
  checkboxRoot: {
    margin: `auto ${theme.spacing(1.5)}px`,
    padding: '0 !important',
    color: `${theme.custom.palette.notesCheckbox} !important`,
  },
  textEmpty: {
    ...theme.custom.fontFamily.metropolis,
    fontWeight: 500,
    fontSize: '0.875rem',
    verticalAlign: 'middle',
  },
  textIncomplete: {
    fontWeight: 400,
    fontSize: '0.875rem',
    verticalAlign: 'middle',
  },
  textComplete: {
    textDecoration: 'line-through',
    textDecorationColor: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '0.875rem',
    verticalAlign: 'middle',
  },
  closeButtonWrapper: {
    margin: 'auto 0',
  },
}));

function ContentList({ notes, setNotes, isEditMode }) {
  return <></>;
}

export default ContentList;

function ContentListItem({
  index,
  text,
  isCompleted,
  isEditMode,
  onTextChange,
  onMarkCompleted,
  onDeletePressed,
  onKeyPressed,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [isFocussed, setIsFocussed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isEmpty = text === '';
  return (
    <div
      className={
        isFocussed
          ? classes.itemContainerWithBorder
          : classes.itemContainerWithoutBorder
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={classes.itemWrapper}>
        <CheckBox
          icon={
            isEmpty && isEditMode ? (
              <AddOutlined fontSize="small" />
            ) : (
              <CheckBoxOutlineBlankOutlined fontSize="small" />
            )
          }
          checkedIcon={<CheckBoxOutlined fontSize="small" />}
          color="default"
          checked={isCompleted}
          disabled={!isEditMode || isEmpty}
          classes={{ root: classes.checkboxRoot }}
          onChange={even => {}}
        />
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: isEmpty
              ? classes.textEmpty
              : isCompleted
              ? classes.textComplete
              : classes.textIncomplete,
          }}
          value={text}
          placeholder={isEditMode ? 'List Item' : ''}
          onChange={event => {}}
          onKeyDown={event => {}}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
          autoFocus={isEmpty}
          readOnly={!isEditMode}
          multiline={true}
        />
        {isEditMode ? (
          isHovered ? (
            <div className={classes.closeButtonWrapper}>
              <IconButton size="small" onClick={() => {}}>
                <CloseOutlined
                  htmlColor={theme.custom.palette.iconColor}
                  fontSize="small"
                />
              </IconButton>
            </div>
          ) : (
            <div style={{ width: '26px' }}></div>
          )
        ) : null}
      </div>
    </div>
  );
}

