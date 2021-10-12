import React from 'react'
import { useForm } from "react-hook-form";
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'; 
import { FormatAlignCenter } from '@material-ui/icons';

const useStyles = makeStyles({  
    formulario:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        gap:5

    },
    mensaje:{
        display: 'flex',
        alignItems: 'center'
    }
});

const BancosAdd = (props) =>{
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const classes = useStyles();
    
    const onSubmit = (data) => {
        props.addRecord(data)
        reset(null);
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
            
            <Button type="submit" variant="contained" color="primary">Agregar</Button>
            <span className={classes.mensaje}>{errors.name?.type === 'required' && "Descripcion es obligatorio"}</span>
        </form>
      )

}
export default BancosAdd;