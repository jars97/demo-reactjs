import TableHead from '@material-ui/core/TableHead'; 
import TableCell from '@material-ui/core/TableCell';  
import TableRow from '@material-ui/core/TableRow'; 
import { withStyles,makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({
    columnHeader:{
        fontWeight: 'bold'
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'red',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const TableHeader = (props) => {
    const headers=props.headers;
    const classes = useStyles();
    return(
        <TableHead>
            <TableRow>
                {headers.map(row => {
                    return(
                        <StyledTableCell key={row} className={classes.columnHeader}>{row}</StyledTableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}
export default TableHeader;