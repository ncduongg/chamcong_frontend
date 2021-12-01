import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={8}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          TransitionComponent={Slide}
          iconVariant={{
            success: '✅ ',
            error: '✖️ ',
            warning: '⚠️ ',
            info: 'ℹ️ ',
          }
          }
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              ✖️
            </Button>
          )}
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
