import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTER_ROUTES } from './APP_ROUTES';
import { AppContext } from './AppContext';
import AppDrawer from './components/AppDrawer';
import AppToolbar from './components/AppToolbar';
import ScrollToAnchor from './components/ScrollToAnchor';

const backToTopAnchorId = 'back-to-top-anchor';

// TODO: drop empty HTML tags
// TODO: fix text editor typing
// TODO: hotlines
// TODO: main photo
// TODO: categories
// TODO: news
// TODO: possibility to pin news
// TODO: holidays calendar

function App() {
  const routes = useRoutes(ROUTER_ROUTES);
  const { isAuthorized } = useContext(AppContext);

  return (
    <Box display="flex">
      <CssBaseline />

      {isAuthorized && <AppDrawer />}

      <AppToolbar />

      <Box display="flex" flexDirection="column" flex={1} p={3}>
        <Toolbar />

        <div id={backToTopAnchorId} />

        {routes}
      </Box>

      <ScrollToAnchor anchorId={backToTopAnchorId} />
    </Box>
  );
}

export default App;
