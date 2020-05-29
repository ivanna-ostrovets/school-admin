import {
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from './routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  }),
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDrawer({ isOpen, onClose }: Props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        <Link to={ROUTES.menuItems}>
          <ListItem button>
            <ListItemIcon>
              <ClassRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Пункти меню" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
