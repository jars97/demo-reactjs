import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider , createTheme} from '@material-ui/core/styles';  



const theme = createTheme({
  palette: {
     primary: {
        light: '#fff',
        main: 'rgb(23, 105, 170)',
        dark: 'rgb(23, 105, 170)'
     },
     secondary: {
       main: '#f44336',
     },
  },
  typography: { 
     useNextVariants: true
  }
});


ReactDOM.render(
  <MuiThemeProvider theme = { theme }>
   
      <App />
    
  </MuiThemeProvider>, 
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
