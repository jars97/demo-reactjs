
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';     
import { useState, useEffect } from 'react' 
import { withStyles,makeStyles } from '@material-ui/core/styles'; 
import BancosService from './BancosService';
import BancosAdd from './BancosAdd';
import IconButton from '@material-ui/core/IconButton';
import TableHeader from '../componentes/TableHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveDialog from '../componentes/RemoveDialog';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CustomTablePaginationActions from '../componentes/TablePaginationActions';  

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


const BancosList = () => {
    const classes = useStyles1();
    const [page, setPage] = useState(0);  
    const [data, setData] = useState([]);   
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    const [totalItems, setTotalItems] = useState(0); 
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState(-1);
    


    const handleCloseAlert = (event, reason) => {
        setSuccess(false);
    };

    const getData = async () =>  {
      const result = await BancosService.getBancos(page+1,rowsPerPage)
      setData(result.data.data); 
      setTotalItems(result.data.totalItems)
    }


    useEffect(() => {
      getData()
    }, [page,rowsPerPage]);

    const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
    }; 

    const handleChangeRowsPerPage = event => { 
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRemove = (id) =>{
      setOpen(true)
      setId(id)
    };

    const headers=['Id','Descripción','Opciones'];
   
    const addRecord = async (val) =>{
        await BancosService.addBanco(val)
        setSuccess(true)
        getData()
    }

    const removeRecord = async () =>{
      await BancosService.deleteBanco(id)
      setSuccess(true)
      if (data.length===1){
        setPage(page-1)
      }else{
        getData()
      } 
    }

    return(
        <div className={classes.root}>
          <Paper >
            <h1>Listado de los Bancos</h1>
            <BancosAdd addRecord={addRecord}></BancosAdd>
            
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHeader headers={headers}></TableHeader>
                    <TableBody>
                        {data.map(row => {
                            return(
                                <StyledTableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                      <IconButton size="small" color="primary" aria-label="Editar"  >
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
                rowsPerPageOptions={[5, 10, 15]}  
                component="div" 
                count={totalItems}
                rowsPerPage={rowsPerPage} 
                page={page}
                onPageChange={handleChangePage} 
                onRowsPerPageChange={handleChangeRowsPerPage} 
                ActionsComponent={CustomTablePaginationActions}
            />
            <RemoveDialog open={open} setOpen={setOpen} removeRecord={removeRecord}></RemoveDialog>
          </Paper>
          <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity="success">
              Operación extiosa!
              </Alert>
          </Snackbar>
        </div>
        
    )
    
} 
export default BancosList;
