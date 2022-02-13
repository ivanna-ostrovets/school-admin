import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, APP_ROUTES } from '../APP_ROUTES';

function DrawerItem({ icon, path, title }: AppRoute) {
  const { pathname } = useLocation();
  const Icon = icon;

  return (
    <Link to={path}>
      <ListItem button selected={path === pathname}>
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
        {Object.values(APP_ROUTES).map(route => (
          <DrawerItem {...route} key={route.path} />
        ))}
      </List>
    </Drawer>
  );
}
