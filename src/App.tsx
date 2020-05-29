import {
  AppBar,
  createStyles,
  CssBaseline,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AppDrawer from './AppDrawer';
import { ROUTES } from './routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
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
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

function App() {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);

  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />

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

            <Link to={ROUTES.default}>
              <Typography variant="h6">
                Адміністративна панель Селецького ЗЗСО
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <AppDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path={ROUTES.default} />

            <Route exact path={ROUTES.menuItems} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
