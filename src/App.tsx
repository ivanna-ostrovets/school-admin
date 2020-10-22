import {
  createMuiTheme,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core';
import { ukUA } from '@material-ui/core/locale';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppDrawer from './AppDrawer';
import AppToolbar from './AppToolbar';
import MenuItems from './MenuItems/MenuItems';
import Partners from './Partners/Partners';
import { ROUTES } from './routes';

const theme = createMuiTheme({}, ukUA);

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
    <ThemeProvider theme={theme}>
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

              <Route exact path={ROUTES.partners.path}>
                <Partners />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
