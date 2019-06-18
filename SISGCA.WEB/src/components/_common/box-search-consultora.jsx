import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FetchConsultoras } from '../../api/common';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DataTable from './datatable';
import DrawerWraperBoxDinamic from './drawer-wraper-box-dinamic';
import { CONSULTORA } from '../_common/_variables';

class BoxSearchConsultora extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.buildInitialState() };
    }

    buildInitialState() {
        return {
            pagination: { page: 1, pageSize: 5, total: 0, items: [] },
            loading: false,
            filters: {
                descripcion: '',
                tipo_consultora: ''
            },
            seleccion_consultora: {
                consultora_seleccionada: ''
            },
            tableDef: {
                propertyKeyName: 'id_consultora',
                columns: [
                    {
                        label: 'RUC',
                        propertyName: 'ruc'
                    },
                    {
                        label: 'NOMBRE DE CONSULTORA',
                        propertyName: 'nom_consultora'
                    },
                    {
                        label: 'Acciones',
                        custom: true,
                        thStyle: {
                            textAlign: 'center'
                        },
                        tdStyle: {
                            textAlign: 'center'
                        },
                        render: (item, loading) => (
                            <div>
                                <IconButton
                                    title="Seleccionar"
                                    aria-label="select"
                                    onClick={this.onSelectItem(item)}
                                    disabled={loading}
                                >
                                    <ArrowForwardIcon />
                                </IconButton>
                            </div>
                        )
                    }
                ]
            }
        };
    }

    setLoading = bool => {
        this.setState({ loading: bool });
    };

    //handleSearch = (tipo_consultora) => {
    //    this.setState({ filters: { tipo_consultora: tipo_consultora} }, () => {
    //        const { pagination } = this.state;
    //        this.loadData(pagination.page, pagination.pageSize);
    //    });
    //};


    handleSearch = () => {
        //CONSULTORA.consultora_seleccionada = this.filters.tipo_consultora;
        const { pagination, ...filters } = this.state;
        this.loadData(pagination.page, pagination.pageSize, filters);
    };

    onSelectItem = item => e => {
        //item.tipo_consultora =this.filters.tipo_consultora;
        const item_full = { ...item, tipo_consultora: this.state.filters.tipo_consultora};
        this.props.onSelect(item_full);
        if (this.props.closeOnSelect) this.close();
    };

    close = () => {
        this.setState({ ...this.buildInitialState() });
        this.props.onClose();
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.data });
        this.handleChangeFilterInput()
    };

    handleChangeFilterInput = e => {
        
        const { filters } = this.state;
        const { seleccion_consultora } = this.state;
        const target = e.target;
        this.setState({
            filters: { ...filters, [target.name]: target.value },
            seleccion_consultora: { ...seleccion_consultora, consultora_seleccionada: target.value }
        });
    };


    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { filters } = this.state;
        this.setState({ filters: { ...filters, [name]: value } });
    };


    loadData = (page, pageSize) => {
        if (this.state.filters.tipo_consultora == null || this.state.filters.tipo_consultora == "") {
            this.props.openToast(
                'Debe seleccionar un tipo de consultora.',
                'warning'
            );
        } else {
            switch (this.state.filters.tipo_consultora) {
                case 1:
                case 2:
                    this.setState({ loading: true });
                    FetchConsultoras(this.state.filters.tipo_consultora, this.state.filters.descripcion, page, pageSize)
                        .then(response => {
                            this.setState({ pagination: response.data.pagination, loading: false });
                        })
                        .catch(err => {
                            this.setState({ loading: false });
                        });
                    break;
                case 3:
                    this.setState({ loading: false });
                    if (this.state.filters.descripcion == "" || this.state.filters.descripcion == null || this.state.filters.descripcion == undefined) {
                        this.props.openToast(
                            'Debe ingresar el nombre de la consultora .',
                            'warning'
                        );
                        //return false;
                    } else {
                        this.setState({ loading: true });
                        FetchConsultoras(this.state.filters.tipo_consultora, this.state.filters.descripcion, page, pageSize)
                            .then(response => {
                                this.setState({ pagination: response.data.pagination, loading: false });
                            })
                            .catch(err => {
                                this.setState({ loading: false });
                            });
                    }
                    break;
                default:
                    break;
            }
        }
       
    };

    render() {
        const { tableDef, loading, pagination, tipos_consultoras } = this.state;
        const { open, defaultNumber } = this.props;
        return (
            <DrawerWraperBoxDinamic
                inputPlaceholder="Nombre de Consultora"
                open={open}
                onClose={this.close}
                onSearch={this.handleSearch}
                loading={loading}
                filters={this.state.filters}
                defaultNumber={defaultNumber}
                searchOnInit={true}
                onInputChange={this.handleChangeFilterInput}
            >
                <DataTable
                    loading={loading}
                    pagination={pagination}
                    tableDef={tableDef}
                    onChangePage={page => {
                        this.loadData(page, pagination.pageSize);
                    }}
                    onChangePageSize={pageSize => {
                        this.loadData(1, pageSize);//(1, pageSize);
                    }}
                />
            </DrawerWraperBoxDinamic>
        );
    }
}

BoxSearchConsultora.defaultProps = {
    closeOnSelect: true
};

BoxSearchConsultora.propTypes = {
    //    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    //    closeOnSelect: PropTypes.bool,
    //    defaultNumber: PropTypes.string
};

export default BoxSearchConsultora;
