import {
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    routes: {
      padding: theme.spacing(1),
    },
  }),
);

function DrawerItem(props: { icon: any; path: string; title: string }) {
  const { pathname } = useLocation();
  const Icon = props.icon;

  return (
    <Link to={props.path}>
      <ListItem button selected={props.path === pathname}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>

        <ListItemText primary={props.title} />
      </ListItem>
    </Link>
  );
}

export default function AppDrawer() {
  const classes = useStyles();

  return (
    <Drawer className={classes.drawer} variant="permanent">
      <Toolbar />

      <List className={classes.routes}>
        {Object.values(ROUTES).map(({ icon, path, title }) => (
          <DrawerItem key={path} icon={icon} path={path} title={title} />
        ))}
      </List>
    </Drawer>
  );
}
