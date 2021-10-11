import React from 'react'
import { useForm } from "react-hook-form";
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles({  
    formulario:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        gap:5

    }
});

const BancosAdd = (props) =>{
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const classes = useStyles();
    
    const onSubmit = (data) => {
        props.addRecord(data)
        reset();
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