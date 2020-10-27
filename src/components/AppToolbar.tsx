import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

function AppToolbar() {
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
  }, [pathname]);

  // TODO: change link to news page
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">
          <Link to={ROUTES.menuItems.path}>
            Адміністративна панель Селецького ЗЗСО
          </Link>

          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;
