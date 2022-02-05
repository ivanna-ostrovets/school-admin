import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ukUA } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import AppToolbar from './components/AppToolbar';
import ScrollToAnchor from './components/ScrollToAnchor';
import { ROUTES } from './routes';
import { useAuth } from './utils/useAuth';

const backToTopAnchorId = 'back-to-top-anchor';

const theme = createTheme({}, ukUA);

// TODO: add scrollbar to inner content only

function App() {
  const [isAuthorized, isLoadingAuth, signIn, signOut] = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex">
        <CssBaseline />

        <Router>
          {isAuthorized && <AppDrawer />}

          <AppToolbar isAuthorized={isAuthorized} signOut={signOut} />

          <Box sx={{ flexGrow: 1, p: 3 }}>
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

                    <Redirect to={ROUTES.partners.path} />
                  </>
                )}
              </Switch>
            </Box>
          </Box>
        </Router>

        <ScrollToAnchor anchorId={backToTopAnchorId} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
