import { ukUA } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppContextProvider from './AppContext';
import './firebaseService';
import './index.css';
import * as serviceWorker from './serviceWorker';

const theme = createTheme({}, ukUA);

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
