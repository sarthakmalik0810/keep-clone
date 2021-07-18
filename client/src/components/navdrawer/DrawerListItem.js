import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    borderRadius: theme.spacing(0, 3, 3, 0),
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`,
  },
}));

function DrawerListItem({ text, icon, isSelected, onClick }) {
  const classes = useStyles();

  return (
    <ListItem
      button
      selected={isSelected}
      classes={{
        root: classes.listItemRoot,
        selected: classes.listItemSelected,
      }}
      onClick={onClick}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
}

export default DrawerListItem;
