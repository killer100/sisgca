import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    flex: {
        flexGrow: 1
    },
    searchButton: {
        color: '#d5d5d5'
    },
    input: {
        color: 'white!important'
    },
    label: {
        color: 'white!important'
    },
    input: {
        color: 'white!important',
        paddingtop: '15px!important'
    },
    textField: {
        width: 250,
        backgroundColor: '#08080800',
        color: 'white!important',
        paddingTop: 0,
        paddingLeft: 0,
        marginRight: 20,
        fontSize: 16,
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    textFieldFocused: {
        width: 400
    },
    textFieldTipoConsultora: {
        color: 'white!important'
    },
    labeltextFieldTipoConsultora: {
        color: 'white!important'
    }
});

//const EMPTY_FORM = {
//    tipo_consultora: '',
//    descripcion: ''
//};
const ERRORS_FORM = {

    tipo_consultora: null,
    descripcion: null
}
//const INITIAL_STATE = {
    //loading: false,
    //form: { ...EMPTY_FORM },
    //errors: { ...ERRORS_FORM }
//};

class DrawerWraperBoxDinamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo_consultora: '',
            descripcion: ''
        };
        //this.state = { ...INITIAL_STATE };
    }

    handleChangeFilter = e => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { filters } = this.state;
        this.setState({ filters: { ...filters, [name]: value } });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.search();    
    };

    search = () => {
        const { onSearch, filters } = this.props;
        onSearch();
    };

    //onOpen = () => {
    //    this.setState({ numero: this.props.defaultNumber || '' }, () => {
    //        if (this.props.searchOnInit) this.search();
    //    });
    //};

    render() {
        const { errors, form, descripcion, tipo_consultora } = this.state;
        const { classes, anchor, open, children, inputPlaceholder, loading, actividades, onInputChange, filters} = this.props;
        const tiposConsultoras = [
            { value: 1, label: 'CONSULTORA'},
            { value: 2, label: 'LABORATORIO' },
            { value: 3, label: 'PERSONA NATURAL' }
        ];
        return (
            <div>
                <Drawer
                    anchor={anchor}
                    open={open}
                    onClose={this.props.onClose}
                    disableBackdropClick
                    disableEscapeKeyDown
                    //onRendered={this.onOpen}
                >
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <form onSubmit={this.handleSubmit} className={classes.flex}>
                                <TextField
                                    select
                                    label="Tipo de Consultora"
                                    name="tipo_consultora"
                                    value={filters.tipo_consultora}
                                    className={classes.textField}
                                    onChange={onInputChange}
                                    disabled={loading}

                                    SelectProps={{
                                        MenuProps: { className: classes.menu }
                                    }}
                                    inputProps={{ className: classes.textFieldTipoConsultora }}
                                >
                                    {tiposConsultoras.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Nombre de Consultora"
                                    className={classes.textField}
                                    name="descripcion"
                                    value={filters.descripcion}
                                    onChange={onInputChange}
                                    disabled={loading}
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="submit"
                                                className={classes.searchButton}
                                                aria-label="Search numero"
                                                disabled={loading}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                            </form>
                            <IconButton variant="fab" color="inherit" onClick={this.props.onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {children}
                </Drawer>
            </div>
        );
    }
}
DrawerWraperBoxDinamic.defaultProps = {
    anchor: 'top',
    inputPlaceholder: 'Buscar',
    searchOnInit: false
};

DrawerWraperBoxDinamic.propTypes = {
    classes: PropTypes.object.isRequired,
    //open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchor: PropTypes.string,
    children: PropTypes.object.isRequired,
    inputPlaceholder: PropTypes.string,
    loading: PropTypes.bool,
    defaultNumber: PropTypes.string,
    searchOnInit: PropTypes.bool
};

export default withStyles(styles)(DrawerWraperBoxDinamic);
