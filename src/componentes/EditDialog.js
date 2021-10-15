
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'; 
import { useForm } from "react-hook-form";
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from "react";

const useStyles = makeStyles({  
    formulario:{
        display:'flex',
        flexDirection:'column',
        padding:10,
        gap:5

    },
    mensaje:{
        display: 'flex',
        alignItems: 'center'
    },
    wrapBotones:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        justifyContent:'center'
    },
});

const EditDialog = (props) => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const classes = useStyles();
    

    const handleClose = () => {
        props.setOpen(false)
    };

    const onSubmit = (data) => {
        data.id=props.rowEdit.id;
        props.onSave(data)
        props.setOpen(false);
    };

    useEffect(() => {
        reset({
            name:props.rowEdit.name,
            codigo:props.rowEdit.codigo
        })

        
      },[props.rowEdit]);

    return (
        
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Editar registro"}</DialogTitle>
            <DialogContent>
                <form className={classes.formulario} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        name="codigo"
                        id="codigo"
                        label="codigo"
                        variant="outlined"
                        {...register("codigo", { required: true})}
                    />
                    <TextField
                        name="name"
                        id="name"
                        label="Descripcion"
                        variant="outlined"
                        {...register("name", { required: true})}
                    />
                    <div className={classes.wrapBotones}>
                        <Button type="submit" variant="contained" color="primary" >Aceptar</Button>
                        <Button  variant="contained" onClick={handleClose} color="secondary" autoFocus >Volver</Button>
                    </div>
                   
                    <span className={classes.mensaje}>{errors.name?.type === 'required' && "La descripcion es obligatoria"}</span>
                    <span className={classes.mensaje}>{errors.codigo?.type === 'required' && "El codigo es obligatorio"}</span>
                </form>
            </DialogContent>
            <DialogActions>
           
            </DialogActions>
        </Dialog>
            
       
        
    )
}
export default EditDialog;
    