import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ukUA } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './AppContext';
import AppDrawer from './components/AppDrawer';
import AppToolbar from './components/AppToolbar';
import ScrollToAnchor from './components/ScrollToAnchor';
import { ROUTES } from './routes';

const backToTopAnchorId = 'back-to-top-anchor';

const theme = createTheme({}, ukUA);

// TODO: add scrollbar to inner content only

function App() {
  const { isAuthorized, isLoadingAuth, signIn } = useContext(AppContext);

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex">
        <CssBaseline />

        <BrowserRouter>
          {isAuthorized && <AppDrawer />}

          <AppToolbar />

          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Box height="100%" width="100%">
              <Toolbar />

              <div id={backToTopAnchorId} />

              {isLoadingAuth && <CircularProgress />}

              <Routes>
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
                      <Route path={path} key={path} element={component} />
                    ))}
                  </>
                )}
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>

        <ScrollToAnchor anchorId={backToTopAnchorId} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
