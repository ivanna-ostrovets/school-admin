import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from './routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
  }),
);

function AppToolbar({
  isDrawerOpen,
  handleDrawerOpen,
}: {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
}) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const pageRoute = Object.values(ROUTES).find(
      route => route.path === pathname,
    );

    if (pageRoute && pageRoute.title) {
      setPageTitle(` | ${pageRoute.title}`);
      return;
    }

    setPageTitle('');
  });

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: isDrawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">
          <Link to={ROUTES.default.path}>
            Адміністративна панель Селецького ЗЗСО
          </Link>

          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;
