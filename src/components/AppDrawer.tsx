import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, ROUTES } from '../routes';

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

export default function AppDrawer() {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Toolbar />

      <List>
        {Object.values(ROUTES).map(route => (
          <DrawerItem {...route} key={route.path} />
        ))}
      </List>
    </Drawer>
  );
}
