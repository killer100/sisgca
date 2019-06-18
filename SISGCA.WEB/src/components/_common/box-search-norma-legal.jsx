import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FecthNormasLegales } from '../../api/common';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DataTable from './datatable';
import DrawerWraperBox from './drawer-wraper-box';

class BoxSearchNormaLegal extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.buildInitialState() };
    }

    buildInitialState() {
        return {
            pagination: { page: 1, pageSize: 5, total: 0, items: [] },
            loading: false,
            filters: {
                numero: ''
            },
            tableDef: {
                propertyKeyName: 'id_norma',
                columns: [
                    {
                        label: 'Número',
                        propertyName: 'cod_norma'
                    },
                    {
                        label: 'Descripción',
                        propertyName: 'des_resumen'
                    },
                    {
                        label: 'Archivo',
                        propertyName: 'a_archivo_nuevo.nombre_inicial'
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

    handleSearch = numero => {
        this.setState({ filters: { numero: numero } }, () => {
            const { pagination } = this.state;
            this.loadData(pagination.page, pagination.pageSize);
        });
    };

    onSelectItem = item => e => {
        this.props.onSelect(item);
        if (this.props.closeOnSelect) this.close();
    };

    close = () => {
        this.setState({ ...this.buildInitialState() });
        this.props.onClose();
    };

    loadData = (page, pageSize) => {
        this.setState({ loading: true });
        FecthNormasLegales(this.state.filters.numero, page, pageSize)
            .then(response => {
                this.setState({ pagination: response.data.pagination, loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    };

    render() {
        const { tableDef, loading, pagination } = this.state;
        const { open, defaultNumber } = this.props;
        return (
            <DrawerWraperBox
                inputPlaceholder="Ingrese número"
                open={open}
                onClose={this.close}
                onSearch={this.handleSearch}
                loading={loading}
                defaultNumber={defaultNumber}
                searchOnInit={true}
            >
                <DataTable
                    tableDef={tableDef}
                    loading={loading}
                    pagination={pagination}
                    onChangePage={page => {
                        this.loadData(page, pagination.pageSize);
                    }}
                    onChangePageSize={pageSize => {
                        this.loadData(1, pageSize);
                    }}
                />
            </DrawerWraperBox>
        );
    }
}

BoxSearchNormaLegal.defaultProps = {
    closeOnSelect: true
};

BoxSearchNormaLegal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    closeOnSelect: PropTypes.bool,
    defaultNumber: PropTypes.string
};

export default BoxSearchNormaLegal;
