import React, { useState }  from 'react'
import { useForm } from "react-hook-form";
import '../Login.css';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  
  const _handleClickShowPassword = (e) => {
    setShowPassword(!showPassword )
  }
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login">
          <span className="titulo">Inicio de sesión</span> 
          <span className="subtitulo">Accede a tu backoffice</span>
          <div className="inputs">
            <TextField
                name="email"
                required
                id="email"
                label="Correo electrónico"
                variant="outlined"
                {...register("email", { required: true})}
            />
            {errors.firstName?.type === 'required' && "email es obligatorio"}

            <TextField
                name="password"
                required
                id="password"
                variant="outlined"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                {...register("password", { required: true})}
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
            {errors.password?.type === 'required' && "password es obligatorio"}
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
          
          
          <Button type="submit" variant="contained" color="primary">Iniciar sesion</Button>
        
          
          <br></br>
          <span className="nueva-cuenta">¿Eres un nuevo usuario? <a href="./home" className="solicita"> Solicita una cuenta</a></span>
      </div>
    </form>
    )
}
export default Login;