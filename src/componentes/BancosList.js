
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';     
import { useState, useEffect } from 'react' 
import { withStyles,makeStyles } from '@material-ui/core/styles'; 
import BancosService from './BancosService';
import BancosAdd from './BancosAdd';

const useStyles = makeStyles({  
      root: {  
        width: '100%',  
      },  
      container: { 
        maxHeight: 440,      
      }, 
      columnHeader:{
        fontWeight: 'bold'
      }
});

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'red',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const BancosList = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);  
    const [data, setData] = useState([]);   
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    const [totalItems, setTotalItems] = useState(0); 

    useEffect(() => {
        console.log('usefect')
        BancosService.getBancos(page+1,rowsPerPage)
        .then((result) => {
            setData(result.data.data); 
            setTotalItems(result.data.totalItems)
        })
        .catch((e)=>{
            console.log(e)
        })
    }, [page,rowsPerPage]);

    const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
    }; 

    const handleChangeRowsPerPage = event => { 
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

   

    return(
        
        <Paper className={classes.root}>
            <h1>Listado de los Bancos</h1>
            <BancosAdd></BancosAdd>
            
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.columnHeader}>Id</StyledTableCell>
                            <StyledTableCell className={classes.columnHeader}>Descripción</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => {
                            return(
                                <StyledTableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
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
            />
        </Paper>
    )
    
} 
export default BancosList;
