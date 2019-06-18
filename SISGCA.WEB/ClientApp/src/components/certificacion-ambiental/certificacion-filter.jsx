import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'material-ui-pickers';
import { dateFormat } from '../../constants/date';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 2 * theme.spacing.unit
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    textField: {
        width: '100%'
    },
    datePicker: {
        margin: 2
    },
    button: {
        margin: theme.spacing.unit
    }
});

const CertificacionFilter = ({
    classes,
    actividades,
    tipos,
    departamentos,
    loading,
    filters,
    provincias,
    distritos,
    onSearch,
    onInputChange,
    onSelectChange,
    onDateChange,
    onClear
}) => (
    <div className={classes.root}>
        <form onSubmit={onSearch} autoComplete="soff">
            <Grid container spacing={24}>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        label="Razón social"
                        className={classes.textField}
                        name="razon_social"
                        value={filters.razon_social}
                        onChange={onInputChange}
                        disabled={loading}
                    />
                </Grid>
            </Grid>
        </form>
    </div>
);

CertificacionFilter.propType = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actividades: PropTypes.array.isRequired,
    tipos: PropTypes.array.isRequired,
    departamentos: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onClear: PropTypes.func
};

export default withStyles(styles)(CertificacionFilter);
