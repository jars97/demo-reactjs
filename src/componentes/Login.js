import React, { useState }  from 'react'
import '../Login.css';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [email, setEmail] = useState("");

  const _onChangeEmail = (e)=>{
    setEmail(e.target.value)
    var longitud = e.target.value.length
    var long_pass =password.length
    setDisableButton(longitud>0 && long_pass>0 ? false : true )  
  }

  const _onChangePassword = (e)=>{
    setPassword( e.target.value )
    var longitud = e.target.value.length
    var long_email = email.length
    setDisableButton(longitud>0 && long_email>0 ? false : true )  
  }
  
  const _handleClickShowPassword = (e) => {
    setShowPassword(!showPassword )
  }
    
    return (
      <div className="login">
        <span className="titulo">Inicio de sesión</span> 
        <span className="subtitulo">Accede a tu backoffice</span>
        <div className="inputs">
          <TextField
              required
              id="email"
              label="Correo electrónico"
              value={email}
              variant="outlined"
              onChange={_onChangeEmail}
          />

          <TextField
              required
              id="password"
              variant="outlined"
              label="Contraseña"
              value={password}
              type={showPassword ? 'text' : 'password'}
              onChange={_onChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                  onClick={_handleClickShowPassword}
                  >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                )
            }}
          />
        </div>
        
        <div className="claves">
          <FormControlLabel
            control={
              <Checkbox
              defaultChecked
                color="primary"
              />
            }
            label="Recuérdame"
          />
          <Button className="recuperar-clave" color="primary">Recuperar clave</Button>
        </div>
        <br></br>
        
        
        <Button variant="contained" color="primary" disabled={disableButton}>Iniciar sesion</Button>
      
        
        <br></br>
        <span className="nueva-cuenta">¿Eres un nuevo usuario? <a href="./home" className="solicita"> Solicita una cuenta</a></span>
    </div>
    )
}
export default Login;