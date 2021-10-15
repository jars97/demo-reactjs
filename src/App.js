import React from 'react';
import './App.css';
//import Login from  './componentes/Login'
import BancosList from  './bancos/BancosList'
import FirebaseList from './googlefirebase/FirebaseList';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React demo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <FirebaseList></FirebaseList>
    </div>
  );
}

export default App;
