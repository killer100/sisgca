import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { ENUM_TIPO_FORM } from '../../constants/enums';
import { dateFormat, FormatDate } from '../../constants/date';
import {
    SaveCertificacion,
    GetCertificacion,
    UpdateCertificacion
} from '../../api/certificacion-ambiental';
// import { CheckRuc, FetchProvincias, FetchDistritos } from '../../api/common';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios';
// import BoxSearchRegistroSitradoc from '../_common/box-search-registro-sitradoc';
// import BoxSearchResolucion from '../_common/box-search-resolucion';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
// import BoxSearchNormaLegal from '../_common/box-search-norma-legal';
// import BoxSearchConsultora from '../_common/box-search-consultora';
import { CONSULTORA } from '../_common/_variables';

const styles = theme => ({
    textField: {
        //marginTop: 20,
        //marginBottom: 20
        width: '100%'
    },
    menu: {
        width: 200
    },
    loaderContainer: {
        height: 5
    },
    buttonPdfActive: {
        color: theme.palette.primary.main
    }
});

const EMPTY_FORM = {
    codigo_departamento: '00',
    codigo_provincia: '00',
    codigo_distrito: '00',
    codigo_consultora: '00',
    departamento: '',
    provincia: '',
    distrito: '',
    consultora: '',
    id_actividad: '',
    id_tipo: '',
    id_documento: 0,
    id_resolucion: 0,
    id_persona: 0,
    id_consultora: 0,
    //consultora: '',
    direccion: '',
    proyecto: '',
    resuelve: '',
    num_registro: '',
    fec_registro: '',
    num_resolucion: '',
    tipo_consultora: '',
    fec_resolucion: '',
    nom_persona: '',
    doc_persona: '',
    id_norma: ''
};

const ERRORS_FORM = {
    id_documento: null,
    id_persona: null,
    direccion: null,
    codigo_departamento: null,
    codigo_provincia: null,
    codigo_distrito: null,
    codigo_consultora: null,
    id_actividad: null,
    id_tipo: null,
    proyecto: null,
    id_resolucion: null,
    id_norma: null,
    resuelve: null
};

const INITIAL_STATE = {
    loading: false,
    form: { ...EMPTY_FORM },
    errors: { ...ERRORS_FORM },
    loadingProvincias: false,
    loadingDistritos: false,
    type: ENUM_TIPO_FORM.CREAR,
    input_search_ruc: '',
    input_nombre_archivo: '',
    provincias: [],
    distritos: [],
    openBoxSitradoc: false,
    openBoxResolucion: false,
    openBoxNormaLegal: false
};

class CertificacionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            seleccion_consultora: { ...CONSULTORA }
        };
    }

    setLoading(bool) {
        this.setState({ loading: bool });
    }

    closeBoxSitradoc = () => {
        this.setState({ openBoxSitradoc: false });
    };

    openBoxSitradoc = () => {
        this.setState({ openBoxSitradoc: true });
    };

    closeBoxResolucion = () => {
        this.setState({ openBoxResolucion: false });
    };

    openBoxResolucion = () => {
        this.setState({ openBoxResolucion: true });
    };

    closeBoxNormaLegal = () => {
        this.setState({ openBoxNormaLegal: false });
    };

    openBoxNormaLegal = () => {
        this.setState({ openBoxNormaLegal: true });
    };

    closeBoxConsultora = () => {
        this.setState({ openBoxConsultora: false });
    };

    openBoxConsultora = () => {
        this.setState({ openBoxConsultora: true });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.Save();
    };

    handleInputChange = event => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { form } = this.state;

        let newState = { ...form, [name]: value };

        if (name == 'codigo_departamento') {
            newState['codigo_provincia'] = '00';
            newState['codigo_distrito'] = '00';
            this.loadProvincias(value);
        }
        if (name == 'codigo_provincia') {
            newState['codigo_distrito'] = '00';
            this.loadDistritos(form.codigo_departamento, value);
        }

        this.setState({ form: newState });
    };

    handleInputRucKeyPress = event => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!/^\d+$/.test(keyValue)) {
            event.preventDefault();
        }
    };

    handleInputRucChange = event => {
        this.setState({ input_search_ruc: event.target.value });
    };

    onOpen = () => {
        if (this.props.id) this.loadCertificacion();
    };

    close = () => {
        this.props.onClose(true);
    };

    handleExited = () => {
        this.setState({ ...INITIAL_STATE });
    };

    dismiss = () => {
        this.setState({ ...INITIAL_STATE });
        this.props.onClose();
    };

    onSelectDocumento = documento => {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                id_documento: documento.id_documento,
                num_registro: documento.num_tram_documentario,
                fec_registro: FormatDate(documento.auditmod, dateFormat)
            }
        });
    };

    onSelectResolucion = resolucion => {
        const { form } = this.state;
        this.setState({
            input_nombre_archivo: '',
            form: {
                ...form,
                id_resolucion: resolucion.id,
                num_resolucion: resolucion.nro_resol,
                fec_resolucion: FormatDate(resolucion.auditmod, dateFormat),
                resuelve: resolucion.sumilla,
                id_norma: ''
            }
        });
    };

    onSelectNormaLegal = normaLegal => {
        const { form } = this.state;
        this.setState({
            input_nombre_archivo: normaLegal.a_archivo_nuevo.nombre_inicial,
            form: {
                ...form,
                id_norma: normaLegal.id_norma
            }
        });
    };

    onSelectConsultora = consultora => {
        const { form } = this.state;
        var tipo_consultora = '';
        var id_consultora = '';
        var descripcion = '';
        
        id_consultora = consultora.id_consultora;
        descripcion = consultora.nom_consultora;
        tipo_consultora = consultora.tipo_consultora;

        this.setState({
            input_nombre_archivo: '',
            form: {
                ...form,
                id_consultora: id_consultora,
                tipo_consultora: descripcion,
                consultora: tipo_consultora
            },
        })
    }

    searchArchivo = () => {
        if (!this.state.form.id_resolucion) {
            this.props.openToast('Primero debe buscar una resolución', 'warning');
            return false;
        }

        this.openBoxNormaLegal();
    };

    // searchRuc = () => {
        // const { input_search_ruc } = this.state;
        // if (input_search_ruc.length < 11) {
            // this.props.openToast(
                // 'Debe ingresar un ruc válido (11 dígitos) para poder buscarlo',
                // 'warning'
            // );
            // return false;
        // }
        // this.setLoading(true),
            // CheckRuc(input_search_ruc)
                // .then(response => {
                    // const { form } = this.state;
                    // this.setLoading(false);
                    // this.setState(
                        // {
                            // form: {
                                // ...form,
                                // codigo_departamento: response.data.codigo_departamento,
                                // codigo_provincia: response.data.codigo_provincia,
                                // codigo_distrito: response.data.codigo_distrito,
                                // id_persona: response.data.id_persona,
                                // direccion: response.data.domicilio,
                                // nom_persona: response.data.razon_social,
                                // doc_persona: response.data.ruc
                            // }
                        // },
                        // () => {
                            // this.loadProvinciasAndDistritos(
                                // response.data.codigo_departamento,
                                // response.data.codigo_provincia
                            // );
                        // }
                    // );
                // })
                // .catch(err => {
                    // console.log(err);
                    // this.props.openToast('No se encontró el ruc', 'error');
                    // const { form } = this.state;
                    // this.setState({
                        // form: {
                            // ...form,
                            // codigo_departamento: '00',
                            // codigo_provincia: '00',
                            // codigo_distrito: '00',
                            // id_persona: 0,
                            // direccion: '',
                            // nom_persona: '',
                            // doc_persona: ''
                        // }
                    // });
                // })
                // .finally(() => {
                    // this.setLoading(false);
                // });
    // };

    // loadProvincias(codigo_departamento) {
        // this.setState({ loadingProvincias: true });
        // FetchProvincias(codigo_departamento)
            // .then(provincias => {
                // this.setState({
                    // provincias: provincias,
                    // loadingProvincias: false
                // });
            // })
            // .catch(err => {
                // console.log(err);
                // this.setState({ loadingProvincias: false });
            // });
    // }

    // loadDistritos(codigo_departamento, codigo_provincia) {
        // this.setState({ loadingDistritos: true });
        // FetchDistritos(codigo_departamento, codigo_provincia)
            // .then(distritos => {
                // this.setState({
                    // distritos: distritos,
                    // loadingDistritos: false
                // });
            // })
            // .catch(err => {
                // this.setState({ loadingDistritos: false });
            // });
    // }

    // loadProvinciasAndDistritos(cod_dep, cod_prov) {
        // this.setState({
            // loadingDistritos: true,
            // loadingProvincias: true
        // });
        // Axios.all([FetchProvincias(cod_dep), FetchDistritos(cod_dep, cod_prov)]).then(
            // Axios.spread((provincias, distritos) => {
                // this.setState({
                    // provincias,
                    // distritos,
                    // loadingDistritos: false,
                    // loadingProvincias: false
                // });
            // })
        // );
    // }

    getNameUbigeo(type, value) {
        if (value == '00') return null;
        switch (type) {
            case 'DEPARTAMENTO':
                return this.props.departamentos.filter(item => {
                    return item.value == value;
                })[0].label;
            case 'PROVINCIA':
                return this.state.provincias.filter(item => {
                    return item.value == value;
                })[0].label;
            case 'DISTRITO':
                return this.state.distritos.filter(item => {
                    return item.value == value;
                })[0].label;
            default:
                return '';
        }
    }

    Save() {
        
        if (this.state.loading) return false;
        const { form } = this.state;

        const data = {
            ...form,
            departamento: this.getNameUbigeo('DEPARTAMENTO', form.codigo_departamento),
            provincia: this.getNameUbigeo('PROVINCIA', form.codigo_provincia),
            distrito: this.getNameUbigeo('DISTRITO', form.codigo_distrito),
            tipo_consultora: form.consultora
        };

        let promise = null;
        if (this.state.type === ENUM_TIPO_FORM.CREAR)
        {
            promise = SaveCertificacion(data);
        }
        else {
            if (!this.props.id) return false;
            promise = UpdateCertificacion(this.props.id, data);
        };

        this.setState({ loading: true, error: { ...ERRORS_FORM } });
        promise
            .then(response => {
                this.props.openToast(response.msg);
                this.setLoading(false);
                this.close();
            })
            .catch(err => {
                if (err) {
                    this.props.openToast(err.msg, 'error');
                    this.setLoading(false);
                    if (err.errors) this.setState({ errors: err.errors });
                }
            });
    }

    loadCertificacion() {
        this.setLoading(true);
        GetCertificacion(this.props.id)
            .then(response => {
                let certificacionString = JSON.stringify(response.data.certificacion).replace(
                    /null/g,
                    '""'
                );

                let certificacion = JSON.parse(certificacionString);

                if (certificacion.fec_registro)
                    certificacion.fec_registro = FormatDate(certificacion.fec_registro, dateFormat);

                if (certificacion.fec_resolucion)
                    certificacion.fec_resolucion = FormatDate(
                        certificacion.fec_resolucion,
                        dateFormat
                    );

                if (certificacion.codigo_departamento)
                    this.loadProvincias(certificacion.codigo_departamento);

                if (certificacion.codigo_provincia)
                    this.loadDistritos(
                        certificacion.codigo_departamento,
                        certificacion.codigo_provincia
                    );

                if (certificacion.consultora) {
                    certificacion.tipo_consultora = certificacion.consultora;
                } else {
                    certificacion.tipo_consultora = "";
                }
                  

                this.setState({
                    input_search_ruc: certificacion.doc_persona,
                    input_nombre_archivo: certificacion.nombre_archivo_norma_legal,
                    form: certificacion,
                    type: ENUM_TIPO_FORM.ACTUALIZAR,
                    loading: false
                });
                
            })
            .catch(err => {
                console.log(err);
                this.setLoading(false);
                this.props.openToast(err.msg, 'error');
            });
    }

    render() {
        const { classes, departamentos, tipos, actividades } = this.props;
        const {
            form,
            loading,
            loadingProvincias,
            loadingDistritos,
            errors,
            provincias,
            distritos,
            openBoxSitradoc,
            openBoxResolucion,
            openBoxNormaLegal,
            openBoxConsultora,
            input_search_ruc,
            input_nombre_archivo,
            seleccion_consultora
        } = this.state;
        let type = '';
        
        switch (this.state.type) {
            case ENUM_TIPO_FORM.CREAR:
                type = 'NUEVO';
                break;
            case ENUM_TIPO_FORM.ACTUALIZAR:
                type = 'EDITAR';
                break;
        }
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.props.open}
                    onEnter={this.onOpen}
                    onClose={this.dismiss}
                    onExited={this.handleExited}
                    aria-labelledby="form-dialog-title"
                    maxWidth="md"
                >
                    <div className={classes.loaderContainer}>{loading && <LinearProgress />}</div>
                    <DialogTitle id="form-dialog-title">
                        {!loading && type} REGISTRO ADMINISTRATIVO DE CERTIFICACIONES AMBIENTALES
                    </DialogTitle>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <DialogContent>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        error={errors.id_documento != null}
                                        helperText={errors.id_documento}
                                        label="N° Registro"
                                        className={classes.textField}
                                        disabled={loading}
                                        value={form.num_registro}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        title="Buscar registro"
                                                        aria-label="Search registro"
                                                        onClick={this.openBoxSitradoc}
                                                        disabled={loading}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        error={errors.id_documento != null}
                                        helperText={errors.id_documento}
                                        label="Fecha"
                                        value={form.fec_registro}
                                        className={classes.textField}
                                        disabled={loading}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        error={errors.id_persona != null}
                                        helperText={errors.id_persona}
                                        label="RUC"
                                        className={classes.textField}
                                        disabled={loading}
                                        inputProps={{ maxLength: 11 }}
                                        onKeyPress={this.handleInputRucKeyPress}
                                        onChange={this.handleInputRucChange}
                                        value={input_search_ruc}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        title="Buscar RUC"
                                                        aria-label="Search RUC"
                                                        onClick={this.searchRuc}
                                                        disabled={loading}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        error={errors.id_persona != null}
                                        helperText={errors.id_persona}
                                        label="Razón Social"
                                        className={classes.textField}
                                        disabled={loading}
                                        value={form.nom_persona}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.direccion != null}
                                        helperText={errors.direccion}
                                        label="Dirección"
                                        className={classes.textField}
                                        disabled={loading}
                                        name="direccion"
                                        value={form.direccion}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.codigo_consultora != null}
                                        helperText={errors.codigo_consultora}
                                        label="Consultora"
                                        className={classes.textField}
                                        name="consultora"
                                        disabled={loading}
                                        value={form.tipo_consultora}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        title="Buscar Consultora"
                                                        aria-label="Search consultora"
                                                        disabled={loading}
                                                        onClick={this.openBoxConsultora}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        error={errors.codigo_departamento != null}
                                        helperText={errors.codigo_departamento}
                                        select
                                        label="Departamento"
                                        className={classes.textField}
                                        name="codigo_departamento"
                                        onChange={this.handleInputChange}
                                        value={form.codigo_departamento}
                                        disabled={loading}
                                        SelectProps={{
                                            MenuProps: { className: classes.menu }
                                        }}
                                    >
                                        <MenuItem value="00">SELECCIONE</MenuItem>
                                        {departamentos.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        error={errors.codigo_provincia != null}
                                        helperText={errors.codigo_provincia}
                                        select
                                        label="Provincia"
                                        name="codigo_provincia"
                                        value={form.codigo_provincia}
                                        onChange={this.handleInputChange}
                                        className={classes.textField}
                                        disabled={loading || loadingProvincias}
                                        SelectProps={{
                                            MenuProps: { className: classes.menu }
                                        }}
                                    >
                                        <MenuItem value="00">SELECCIONE</MenuItem>
                                        {provincias.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        error={errors.codigo_distrito != null}
                                        helperText={errors.codigo_distrito}
                                        select
                                        label="Distrito"
                                        className={classes.textField}
                                        name="codigo_distrito"
                                        value={form.codigo_distrito}
                                        onChange={this.handleInputChange}
                                        disabled={loading || loadingDistritos}
                                        SelectProps={{
                                            MenuProps: { className: classes.menu }
                                        }}
                                    >
                                        <MenuItem value="00">SELECCIONE</MenuItem>
                                        {distritos.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.id_actividad != null}
                                        helperText={errors.id_actividad}
                                        select
                                        name="id_actividad"
                                        value={form.id_actividad}
                                        onChange={this.handleInputChange}
                                        label="Actividad"
                                        className={classes.textField}
                                        disabled={loading}
                                        SelectProps={{
                                            MenuProps: { className: classes.menu }
                                        }}
                                    >
                                        {actividades.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.id_tipo != null}
                                        helperText={errors.id_tipo}
                                        select
                                        label="IGA"
                                        name="id_tipo"
                                        value={form.id_tipo}
                                        className={classes.textField}
                                        onChange={this.handleInputChange}
                                        disabled={loading}
                                        SelectProps={{
                                            MenuProps: { className: classes.menu }
                                        }}
                                    >
                                        {tipos.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.proyecto != null}
                                        helperText={errors.proyecto}
                                        multiline
                                        rows={4}
                                        name="proyecto"
                                        label="Proyecto"
                                        className={classes.textField}
                                        disabled={loading}
                                        inputProps={{ maxLength: 4000 }}
                                        value={form.proyecto}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        error={errors.id_resolucion != null}
                                        helperText={errors.id_resolucion}
                                        label="Resolución"
                                        className={classes.textField}
                                        disabled={loading}
                                        value={form.num_resolucion}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        title="Buscar Resolución"
                                                        aria-label="Search resolucion"
                                                        disabled={loading}
                                                        onClick={this.openBoxResolucion}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        error={errors.id_resolucion != null}
                                        helperText={errors.id_resolucion}
                                        label="Fecha resolución"
                                        className={classes.textField}
                                        disabled={loading}
                                        value={form.fec_resolucion}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        error={errors.id_norma != null}
                                        helperText={errors.id_norma}
                                        label="Archivo"
                                        className={classes.textField}
                                        disabled={loading}
                                        value={input_nombre_archivo}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        title="Buscar link del archivo"
                                                        aria-label="buscar enlace archivo"
                                                        disabled={loading}
                                                        onClick={this.searchArchivo}
                                                        className={
                                                            form.id_norma
                                                                ? classes.buttonPdfActive
                                                                : ''
                                                        }
                                                    >
                                                        <PictureAsPdfIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.resuelve != null}
                                        helperText={errors.resuelve}
                                        multiline
                                        name="resuelve"
                                        rows={4}
                                        label="Resuelve"
                                        className={classes.textField}
                                        disabled={loading}
                                        inputProps={{ maxLength: 4000 }}
                                        value={form.resuelve}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={this.dismiss} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                disabled={loading || loadingProvincias || loadingDistritos}
                            >
                                Guardar
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

CertificacionForm.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    departamentos: PropTypes.array.isRequired,
    actividades: PropTypes.array.isRequired,
    tipos: PropTypes.array.isRequired,
    //openToast: PropTypes.func.isRequired
};

export default withStyles(styles)(CertificacionForm);
