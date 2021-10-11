
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'; 
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import BancosService from '../bancos/BancosService';


const RemoveDialog = ({open, setOpen,id,sucess,setSuccess}) => {
    
    const handleClose = () => {
        setOpen(false);
    };

    
    const handleYes= () => {
        BancosService.deleteBanco(id) 
        .then((result) => {
            setSuccess(true)
        })
        .catch((e)=>{
            console.log(e)
        })
        setOpen(false);
    };

    return (
        
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confimación"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Realmente desea eliminar el registro?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button  variant="contained" onClick={handleYes} color="primary" startIcon={<CheckIcon />}>
                SI
            </Button>
            <Button  variant="contained" onClick={handleClose} color="secondary" autoFocus startIcon={<CloseIcon />}>
                NO
            </Button>
            </DialogActions>
        </Dialog>
            
       
        
    )
}
export default RemoveDialog;
    