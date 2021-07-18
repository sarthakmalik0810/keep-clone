import {
  Drawer,
  List,
  makeStyles,
  useMediaQuery,
  useTheme,
  Divider,
  Typography,
} from '@material-ui/core';
import { WbIncandescentOutlined, LabelOutlined } from '@material-ui/icons';
import { useQuery } from 'react-query';
import useLabels from '../../hooks/use-labels';
import { useUIStore } from '../../store/ui-context';
import DrawerListItem from './DrawerListItem';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.mixins.drawer.minWidth,
  },
  drawerPaper: {
    background: theme.palette.background.default,
    width: theme.mixins.drawer.minWidth,
    border: 0,
  },
  sectionTitle: {
    padding: theme.spacing(2, 1, 0, 2),
    color: theme.palette.text.secondary,
  },
  toolbar: theme.mixins.toolbar,
}));

function NavDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const { isNavBarOpen, selectedLabelId, labelSelect, toggleNavBar } =
    useUIStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { data: labels, status: labelStatus } = useLabels();

  const labelSelectHandler = labelId => {
    labelSelect(labelId);
  };

  if (labelStatus === 'loading') {
    return <></>;
  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={isNavBarOpen}
      onClose={toggleNavBar}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <DrawerListItem
          text={'Notes'}
          isSelected={selectedLabelId === ''}
          icon={
            <WbIncandescentOutlined
              htmlColor={theme.custom.palette.iconColor}
            />
          }
        />
      </List>
      <Divider />
      <div className={classes.sectionTitle}>
        <Typography variant="overline" component="span">
          Labels
        </Typography>
      </div>
      <List>
        {labels.map(labelItem => (
          <DrawerListItem
            key={labelItem._id}
            text={labelItem.name}
            icon={<LabelOutlined htmlColor={theme.custom.palette.iconColor} />}
            isSelected={selectedLabelId === labelItem._id}
            onClick={() => labelSelectHandler(labelItem._id)}
          />
        ))}
      </List>
    </Drawer>
  );
}

export default NavDrawer;
