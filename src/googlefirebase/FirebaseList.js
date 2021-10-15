

import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';     
import { useState, useEffect } from 'react' 
import { withStyles,makeStyles } from '@material-ui/core/styles'; 
import IconButton from '@material-ui/core/IconButton';
import TableHeader from '../componentes/TableHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveDialog from '../componentes/RemoveDialog';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import FirebaseService from './FirebaseService';
import AddRecord from './AddRecord'
import '../index.css'
import EditDialog from '../componentes/EditDialog'

const useStyles1 = makeStyles((theme) => ({
    root: {
        width: '95%',  
        flexShrink: 0,
        marginLeft: theme.spacing(2.0),
    },
    container: { 
        maxHeight: 440,      
      }, 
    columnHeader:{
        fontWeight: 'bold'
    },
    footer:{
        width: '100%',    
    }
}));

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const FirebaseList = () => {
    const classes = useStyles1();
    const [page, setPage] = useState(0);  
    const [data, setData] = useState([]);   
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    const [totalItems, setTotalItems] = useState(0); 
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState({});
    const [update,setUpdate]=useState(false)
    const [openEdit, setOpenEdit] = useState(false);
    const [rowEdit, setRowEdit] = useState({});

    useEffect(() => {
        const getFirst = async () =>  {
            const totRecords = await FirebaseService.getAll()
            const result = await FirebaseService.getFirst(rowsPerPage)
            setData(fillDataArray(result)); 
            setTotalItems(totRecords.size)
        }  
       getFirst()
       
    }, [rowsPerPage,update]); 

    const fillDataArray = (data)=>{
        return data.docs.map((doc)=> ({...doc.data(),id:doc.id}))
    }

    const handleChangePage  = (event, newPage) => {  
        const last = data[data.length-1];
        const first = data[0];
        newPage>page ? nextPage(last) : previusPage(first);
        setPage(newPage);  
    }; 

    const nextPage = async (item) =>{
        const result= await FirebaseService.getNextPage(rowsPerPage,item)
        setData(fillDataArray(result)); 
    }

    const previusPage = async (item) =>{
        const result= await FirebaseService.getPreviusPage(rowsPerPage,item)
        setData(fillDataArray(result)); 
    }

    const handleChangeRowsPerPage = event => { 
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addRecord = (val) =>{
        FirebaseService.addBanco(val)
        setSuccess(true) 
        setUpdate(!update)       
    }

    const handleCloseAlert = (event, reason) => {
        setSuccess(false);
    };

    const handleRemove = (data) =>{
        setOpen(true)
        setId(data)
    };

    const removeRecord = () =>{
        FirebaseService.deleteBanco(id)
        setSuccess(true)
        if (data.length===1){
            setPage(page-1)
        }else{
            setUpdate(!update)    
        } 
    }

    const handleEdit = (data) =>{
        setRowEdit(data)
        setOpenEdit(true)
        
    };

    const saveRecord = (data) =>{
        FirebaseService.updateBanco(data)
        setSuccess(true) 
        setUpdate(!update) 
    }
  

    const headers=['Codigo','Descripción','Opciones'];
      
    return(
        <div className={classes.root}>
          <Paper >
            <h1>Listado de los Bancos</h1>
            <AddRecord addRecord={addRecord}></AddRecord>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHeader headers={headers}></TableHeader>
                    <TableBody>
                        {data && data.map(row => {
                            return(
                                <StyledTableRow key={row.codigo}>
                                    <TableCell>{row.codigo}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell >
                                        <IconButton size="small" color="primary" aria-label="Editar" onClick={() => handleEdit(row)} >
                                            <EditIcon/>
                                        </IconButton>
                                      <IconButton size="small" color="secondary" aria-label="Eliminar" onClick={() => handleRemove(row.id)}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                </StyledTableRow>
                            )
                        })}
                       
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2,5, 10, 15]}  
                component="div" 
                count={totalItems}
                rowsPerPage={rowsPerPage} 
                page={page}
                onPageChange={handleChangePage} 
                onRowsPerPageChange={handleChangeRowsPerPage} 
                
            />
            <RemoveDialog open={open} setOpen={setOpen} onRemove={removeRecord}></RemoveDialog>
            <EditDialog open={openEdit} setOpen={setOpenEdit} rowEdit={rowEdit} onSave={saveRecord} ></EditDialog>
          </Paper>
          <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseAlert} >
              <Alert onClose={handleCloseAlert} severity="success">
              Operación extiosa!
              </Alert>
          </Snackbar>
        </div>
        
    )
    
} 
export default FirebaseList;
