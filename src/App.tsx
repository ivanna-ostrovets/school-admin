import {
  Box,
  Button,
  CircularProgress,
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
import { useAuth } from './useAuth';

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
  const [isAuthorized, isLoadingAuth, signIn, signOut] = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />

        <Router>
          {isAuthorized && <AppDrawer />}

          <AppToolbar isAuthorized={isAuthorized} signOut={signOut} />

          <main className={classes.content}>
            <Box height="100%" width="100%">
              <Toolbar />

              <div id={backToTopAnchorId} />

              <Switch>
                {isLoadingAuth && <CircularProgress />}

                {!isLoadingAuth && !isAuthorized && (
                  <Box display="flex" position="absolute">
                    <Button variant="outlined" color="primary" onClick={signIn}>
                      Увійти за допомогою Google
                    </Button>
                  </Box>
                )}

                {isAuthorized && (
                  <>
                    {Object.values(ROUTES).map(({ path, component }) => (
                      <Route exact path={path} key={path}>
                        {component}
                      </Route>
                    ))}

                    <Redirect to={ROUTES.menuItems.path} />
                  </>
                )}
              </Switch>
            </Box>
          </main>
        </Router>

        <ScrollTop anchorId={backToTopAnchorId} />
      </div>
    </ThemeProvider>
  );
}

export default App;
