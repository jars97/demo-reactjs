import React, { Component } from 'react'
import '../Login.css';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

export class Login extends Component{
  state = {
    showPassword: false,
    disableButton: false,
    email:"",
    password:""
  }
  
  _handleClickShowPassword = (e) => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  _onChangeEmail = (e)=>{
    this.setState({ email: e.target.value })
    var longitud = e.target.value.length
    var long_pass = this.state.password.length
    this.setState({ disableButton: longitud>0 && long_pass>0 ? false : true })  
  }

  _onChangePassword = (e)=>{
    this.setState({ password: e.target.value })
    var longitud = e.target.value.length
    var long_email = this.state.email.length
    this.setState({ disableButton: longitud>0 && long_email>0 ? false : true })  
  }


  render(){
   
  
    
    return (
      <div className="login">
        <span className="titulo">Inicio de sesión</span> 
        <span className="subtitulo">Accede a tu backoffice</span>
        <div className="inputs">
          <TextField
              required
              id="outlined-required"
              label="Correo electrónico"
              value={this.state.email}
              variant="outlined"
              onChange={this._onChangeEmail}
          />

          <TextField
              required
              id="outlined-required"
              variant="outlined"
              label="Contraseña"
              value={this.state.password}
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this._onChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={this._handleClickShowPassword}
                  >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
        {this.state.disableButton ? <Button variant="contained" color="primary" disabled>Iniciar sesion </Button>: <Button variant="contained" color="primary" >Iniciar sesion</Button>}
        
          
        
        <br></br>
        <span className="nueva-cuenta">¿Eres un nuevo usuario? <a href="./home" className="solicita"> Solicita una cuenta</a></span>
    </div>
    )
  }
}
