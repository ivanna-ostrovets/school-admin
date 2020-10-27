import {
  createMuiTheme,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core';
import { ukUA } from '@material-ui/core/locale';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import AppToolbar from './components/AppToolbar';
import ScrollTop from './components/ScrollTop';
import { ROUTES } from './routes';

const backToTopAnchorId = 'back-to-top-anchor';

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
  }),
);

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />

        <Router>
          <AppDrawer />

          <AppToolbar />

          <main className={classes.content}>
            <Toolbar />

            <div id={backToTopAnchorId} />

            <Switch>
              <Route exact path={'/'}>
                <Redirect to={ROUTES.menuItems.path} />
              </Route>

              {Object.values(ROUTES).map(({ path, component }) => (
                <Route exact path={path} key={path}>
                  {component}
                </Route>
              ))}
            </Switch>
          </main>
        </Router>

        <ScrollTop anchorId={backToTopAnchorId} />
      </div>
    </ThemeProvider>
  );
}

export default App;
