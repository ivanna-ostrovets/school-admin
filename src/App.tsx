import {
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppDrawer from './AppDrawer';
import AppToolbar from './AppToolbar';
import MenuItems from './MenuItems';
import { ROUTES } from './routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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

        <AppToolbar
          isDrawerOpen={isDrawerOpen}
          handleDrawerOpen={handleDrawerOpen}
        />

        <AppDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path={ROUTES.default.path} />

            <Route exact path={ROUTES.menuItems.path}>
              <MenuItems />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
