import React from 'react';
import './App.css';
//import Login from  './componentes/Login'
import BancosList from  './bancos/BancosList'
import FirebaseList from './googlefirebase/FirebaseList';


function App() {

  return (
    <div className="App">
      <FirebaseList></FirebaseList>
    </div>
  );
}

export default App;
