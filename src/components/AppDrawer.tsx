import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_ROUTES, AppRoute } from '../APP_ROUTES';

function DrawerItem({ icon: Icon, path, title }: AppRoute) {
  const { pathname } = useLocation();

  return (
    <Link to={path}>
      <ListItem button selected={pathname.startsWith(path)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>

        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
}

const drawerWidth = 240;

export default function AppDrawer() {
  const routesToRender = Object.values(APP_ROUTES).filter(
    ({ showInNavigation }) => showInNavigation,
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />

      <List>
        {routesToRender.map(route => (
          <DrawerItem {...route} key={route.path} />
        ))}
      </List>
    </Drawer>
  );
}
