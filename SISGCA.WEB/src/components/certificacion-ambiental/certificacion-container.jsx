import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DataTable from '../_common/datatable';
import CertificacionFilter from './certificacion-filter';
import { FetchCertificaciones, DeleteCertificacion } from '../../api/certificacion-ambiental';
import {
    FetchActividades,
    FetchDepartamentos,
    FetchTipos,
    FetchProvincias,
    FetchDistritos
} from '../../api/common';
import axios from 'axios';
import CertificacionForm from './certificacion-form';
import Toast from '../_common/toast';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FooterProduce from '../_layout/footer-produce';
import CertificacionListItemAction from './certificacion-list-item-action';

const INITIAL_FILTERS = {
    razon_social: '',
    ruc: '',
    id_actividad: '',
    id_tipo: '',
    numero_registro: '',
    fecha_inicio: null,
    fecha_final: null,
    codigo_departamento: '00',
    codigo_provincia: '00',
    codigo_distrito: '00'
};

const styles = theme => ({
    root: {},
    leftIcon: {
        marginRight: theme.spacing.unit,
        marginTop: -2
    },
    button: {
        margin: theme.spacing.unit
    }
});

const createTableDef = actions => ({
    colgroup: [
        { width: '6%' },
        { width: '5%' },
        { width: '10%' },
        { width: '6%' },
        { width: '15%' },
        { width: '7%' },
        { width: '5%' },
        { width: '10%' },
        { width: '10%' },
        { width: '5%' },
        { width: '10%' }
    ],
    propertyKeyName: 'id_certificado_ambiental',
    columns: [
        {
            label: 'Registro',
            propertyName: 'num_registro',
            thStyle: { padding: 5},
            tdStyle: { padding: 5}
        },
        {
            label: 'Fecha',
            propertyName: 'fec_registro',
            isDate: true,
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Razón social',
            propertyName: 'nom_persona',
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'RUC',
            propertyName: 'doc_persona',
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Dirección',
            propertyName: "direccion_completa || '-'",
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Actividad',
            propertyName: "abrev_actividad || '-'",
            thStyle: { padding: 5, paddingLeft: 15 },
            tdStyle: { padding: 5, paddingLeft: 15 }
        },
        {
            label: 'IGA',
            propertyName: "abrev_tipo || '-'",
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Consultora',
            propertyName: "consultora || '-'",
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Resolución',
            propertyName: "num_resolucion || '-'",
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Fecha ',
            propertyName: 'fec_resolucion',
            isDate: true,
            thStyle: { padding: 5 },
            tdStyle: { padding: 5 }
        },
        {
            label: 'Acciones',
            custom: true,
            thStyle: { textAlign: 'center', padding: 5 },
            tdStyle: { textAlign: 'center', padding: 5 },
            render: actions
        }
    ]
});

class CertificacionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            enumerables: {
                actividades: [],
                tipos: [],
                departamentos: [],
                provincias: [],
                distritos: []
            },
            pagination: {
                page: 1,
                pageSize: 5,
                total: 0,
                items: []
            },
            dataTableError: false,
            toast: {
                open: false,
                variant: 'success',
                message: ''
            },
            form: {
                id: null,
                open: false
            },
            filters: {
                ...INITIAL_FILTERS
            }, //nombre_archivo_norma_legal
            tableDef: createTableDef((item, loading) => (
                <CertificacionListItemAction
                    item={item}
                    loading={loading}
                    onClickEditar={this.openForm}
                    onDelete={this.handleDeleteCertificacion}
                />
            ))
        };
    }

    toReporte = () => {
        const qr = queryString.stringify(this.state.filters);
        location.href = '/api/reporte/certificaciones?' + qr;
    };

    openToast = (message, variant = 'success') => {
        this.setState({ toast: { open: true, message: message, variant: variant } });
    };

    closeToast = () => {
        const { toast } = this.state;
        this.setState({ toast: { ...toast, open: false } });
    };

    clearFilters = () => {
        const { pagination } = this.state;
        this.setState({ filters: { ...INITIAL_FILTERS } }, () => {
            this.loadData(pagination.page, pagination.pageSize);
        });
    };
    
    handleSearch = e => {
        e.preventDefault();
        const { pagination, filters } = this.state;
        this.loadData(pagination.page, pagination.pageSize, filters);
    };

    loadData = (page, pageSize) => {
        this.setState({ loading: true });
        FetchCertificaciones(page, pageSize, this.state.filters)
            .then(response => {
                this.setState({
                    pagination: response.data.pagination,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    dataTableError: true,
                    loading: false
                });
            });
    };

    closeForm = (success = false) => {
        if (success === true)
            this.loadData(this.state.pagination.page, this.state.pagination.pageSize);
        this.setState({ form: { id: null, open: false } });
    };

    openForm = (id = null) => () => {
        this.setState({ form: { id: id, open: true } });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { filters } = this.state;
        this.setState({ filters: { ...filters, [name]: value } });
    };

    handleSelectChange = name => event => {
        this.setState({ loading: true });

        const loadProvincias = cod_dep => {
            FetchProvincias(cod_dep)
                .then(provincias => {
                    const { enumerables } = this.state;
                    this.setState({
                        enumerables: { ...enumerables, provincias },
                        loading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const loadDistritos = (cod_dep, cod_prov) => {
            FetchDistritos(cod_dep, cod_prov)
                .then(distritos => {
                    const { enumerables } = this.state;
                    this.setState({
                        enumerables: { ...enumerables, distritos },
                        loading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const { filters } = this.state;

        switch (name) {
            case 'codigo_departamento':
                loadProvincias(event.target.value);
                this.setState({
                    filters: {
                        ...filters,
                        [name]: event.target.value,
                        codigo_provincia: '00',
                        codigo_distrito: '00'
                    }
                });
                break;
            case 'codigo_provincia':
                loadDistritos(this.state.filters.codigo_departamento, event.target.value);
                this.setState({
                    filters: { ...filters, [name]: event.target.value, codigo_distrito: '00' }
                });
                break;
        }
    };

    handleDateChange = name => date => {
        const { filters } = this.state;
        this.setState({ filters: { ...filters, [name]: date.toDate() } });
    };

    handleDeleteCertificacion = id_certificado_ambiental => {
        this.setState({ loading: true });
        DeleteCertificacion(id_certificado_ambiental)
            .then(response => {
                this.openToast(response.msg);
                this.setState({ loading: false }, () => {
                    const { pagination, filters } = this.state;
                    this.loadData(pagination.page, pagination.pageSize, filters);
                });
            })
            .catch(err => {
                this.openToast(err.msg, 'error');
                this.setState({ loading: false });
            });
    };

    loadEnumerables() {
        this.setState({ loading: true });
        const promises = [FetchDepartamentos(), FetchActividades(), FetchTipos()];
        axios
            .all(promises)
            .then(
                axios.spread((departamentos, actividades, tipos) => {
                    const { enumerables } = this.state;
                    this.setState({
                        loading: false,
                        enumerables: {
                            ...enumerables,
                            departamentos: departamentos,
                            actividades: actividades,
                            tipos: tipos
                        }
                    });
                })
            )
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this.loadEnumerables();
        const { pagination } = this.state;
        this.loadData(pagination.page, pagination.pageSize);
    }

    render() {
        const { classes } = this.props;
        const {
            loading,
            tableDef,
            dataTableError,
            filters,
            enumerables,
            form,
            toast,
            pagination
        } = this.state;
        return (
            <Card className={classes.root}>
                <CardHeader
                    title=" Lista de certificaciones"
                    action={
                        <div>
                            <Button
                                color="primary"
                                className={classes.button}
                                onClick={this.toReporte}
                            >
                                <Icon className={classes.leftIcon}>bar_chart</Icon>
                                Reporte Excel
                            </Button>
                            <Button
                                color="primary"
                                className={classes.button}
                                onClick={this.openForm()}
                            >
                                <AddIcon className={classes.leftIcon} />
                                Nuevo Registro
                            </Button>
                        </div>
                    }
                />
                <CardContent>
                    <CertificacionFilter
                        filters={filters}
                        actividades={enumerables.actividades}
                        tipos={enumerables.tipos}
                        departamentos={enumerables.departamentos}
                        provincias={enumerables.provincias}
                        distritos={enumerables.distritos}
                        loading={loading}
                        onInputChange={this.handleInputChange}
                        onSelectChange={this.handleSelectChange}
                        onDateChange={this.handleDateChange}
                        onSearch={this.handleSearch}
                        onClear={this.clearFilters}
                    />
                </CardContent>
                <DataTable
                    fixedTable
                    fixedTableWidth={1500}
                    error={dataTableError}
                    pagination={pagination}
                    tableDef={tableDef}
                    itemsPerPageOptions={[5, 10]}
                    onChangePage={page => {
                        this.loadData(page, pagination.pageSize);
                    }}
                    onChangePageSize={pageSize => {
                        this.loadData(1, pageSize);
                    }}
                    loading={loading}
                    paginationFloatLeft
                />
                <CertificacionForm
                    actividades={enumerables.actividades}
                    tipos={enumerables.tipos}
                    departamentos={enumerables.departamentos}
                    onClose={this.closeForm}
                    open={form.open}
                    id={form.id}
                    openToast={this.openToast}
                />
                <Toast
                    open={toast.open}
                    variant={toast.variant}
                    onClose={this.closeToast}
                    message={toast.message}
                />
                <FooterProduce />
            </Card>
        );
    }
}

CertificacionContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CertificacionContainer);
