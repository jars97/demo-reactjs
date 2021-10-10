
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';     
import { useState, useEffect } from 'react' 
import { withStyles,makeStyles, useTheme } from '@material-ui/core/styles'; 
import BancosService from './BancosService';
import BancosAdd from './BancosAdd';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import TableHeader from '../componentes/TableHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.footer}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };


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
    const [rowsPerPage, setRowsPerPage] = useState(10); 
    const [totalItems, setTotalItems] = useState(0); 

    useEffect(() => {
        //console.log('usefect')
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

    const headers=['Id','Descripción','Opciones'];
   

    return(
        
        <Paper className={classes.root}>
            <h1>Listado de los Bancos</h1>
            <BancosAdd></BancosAdd>
            
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
                                      <IconButton size="small" color="primary" aria-label="Eliminar">
                                        <EditIcon/>
                                      </IconButton>
                                      <IconButton size="small" color="secondary" aria-label="Eliminar">
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
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    )
    
} 
export default BancosList;
