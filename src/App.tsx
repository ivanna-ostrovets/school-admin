import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ukUA } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from './AppContext';
import AppDrawer from './components/AppDrawer';
import AppToolbar from './components/AppToolbar';
import { PrivateRoute } from './components/PrivateRoute';
import ScrollToAnchor from './components/ScrollToAnchor';
import { ROUTES } from './routes';

const backToTopAnchorId = 'back-to-top-anchor';

const theme = createTheme({}, ukUA);

// TODO: add scrollbar to inner content only

function App() {
  const { isAuthorized } = useContext(AppContext);

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

              <Routes>
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.menuItems.path} />}
                />

                <>
                  {Object.values(ROUTES).map(({ path, component }) => (
                    <Route
                      path={path}
                      key={path}
                      element={<PrivateRoute>{component}</PrivateRoute>}
                    />
                  ))}
                </>
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
