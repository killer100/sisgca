import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CustomTableCell = withStyles(theme => ({
    head: {
        fontSize: theme.typography.fontSize + 2,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
}))(TableCell);

class DataTableHeader extends React.Component {
    render() {
        const { columns } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        <CustomTableCell component="th" scope="row" key={index} style={column.thStyle}>
                            {column.label}
                        </CustomTableCell>
                    ), this)}
                </TableRow>
            </TableHead>
        );
    }
}

DataTableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
};


export default DataTableHeader;