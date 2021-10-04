import React from 'react';
import '../Login.css';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';

export const Login = () => (
    <div className="login">
        <span className="titulo">Inicio de sesión</span> 
        <span className="subtitulo">Accede a tu backoffice</span>
        <div className="inputs">
          <TextField
              required
              id="outlined-required"
              label="Correo electrónico"
              variant="outlined"
          />

          <TextField
              required
              id="outlined-required"
              
              variant="outlined"
              label="Contraseña"
              type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Visibility />
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
        <Button variant="contained" color="primary">
          Iniciar sesion
        </Button>
        <br></br>
        <span className="nueva-cuenta">¿Eres un nuevo usuario? <a href="./home" className="solicita"> Solicita una cuenta</a></span>
    </div>
      
)