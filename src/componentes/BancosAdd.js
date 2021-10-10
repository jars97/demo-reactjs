import React, { useState }  from 'react'
import { useForm } from "react-hook-form";
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { withStyles,makeStyles } from '@material-ui/core/styles'; 
import { findByLabelText } from '@testing-library/react';
import { Rowing } from '@material-ui/icons';
import BancosService from './BancosService';

const useStyles = makeStyles({  
    formulario:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        gap:5

    }
});

const BancosAdd = () =>{
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const classes = useStyles();
    const [name, setName] = useState();
    
    const onSubmit = (data) => {
        console.log(data);
        BancosService.addBanco(data)
        .then((result) => {
            reset(result);
            console.log(result);
        })
        .catch((e)=>{
            console.log(e)
        })
    };

    return (
        <form className={classes.formulario} onSubmit={handleSubmit(onSubmit)}>
           
                <TextField
                    name="name"
                    id="name"
                    label="Descripcion"
                    variant="outlined"
                    {...register("name", { required: true})}
                />
                {errors.descripcion?.type === 'required' && "Descripcion es obligatorio"}
                <Button type="submit" variant="contained" color="primary">Agregar</Button>
           
            
        </form>
      )

}
export default BancosAdd;