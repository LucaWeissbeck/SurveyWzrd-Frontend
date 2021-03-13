import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette:{
        //type: 'dark',
        primary:{
            main: '#254563',
            light: '#839fc2',
            dark: '#547192' //main is now dark and dark is main
        },
        secondary:{
            main: '#e9c261',
            light: '#fff591',
            dark: '#b49232'
        }

    }
})

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
