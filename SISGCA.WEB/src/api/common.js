import axios from 'axios';

const routes = {
    // general: '/api/general',
    // sitradoc: '/api/sitradoc',
    // sunat: '/api/sunat',
    // user: 'api/home/userinfo',
    // siscon: '/api/siscon',
    // siscon_1: '/api/siscon_1'
};

export function GetUser() {
    return axios.post(routes.user).then(function (response) {
        return response.data.user;
    }).catch(err => {
        throw err;
    });
}

export function FetchDepartamentos() {
    return axios.get(`${routes.general}/departamento`).then(function (response) {
        return response.data.data.departamentos;
    }).catch(function (error) {
        throw error;
    });
}

export function FetchProvincias(codigo_departamento) {
    const params = {
        codigo_departamento: codigo_departamento
    };
    return axios.get(`${routes.general}/provincia`, {
        params: params
    }).then(function (response) {
        return response.data.data.provincias;
    }).catch(function (error) {
        throw error;
    });
}

export function FetchDistritos(codigo_departamento, codigo_provincia) {
    const params = {
        codigo_departamento: codigo_departamento,
        codigo_provincia: codigo_provincia
    };
    return axios.get(`${routes.general}/distrito`, {
        params: params
    }).then(function (response) {
        return response.data.data.distritos;
    }).catch(function (error) {
        throw error;
    });
}

export function FetchActividades() {
    return axios.get(`${routes.general}/actividad`).then(function (response) {
        return response.data.data.actividades;
    }).catch(function (error) {
        throw error;
    });
}

export function FetchTipos() {
    // return axios.get(`${routes.general}/tipo`).then(function (response) {
        // return response.data.data.tipos;
    // }).catch(function (error) {
        // throw error;
    // });
}

export function CheckRuc(ruc) {
    // const params = {
        // ruc: ruc
    // };
    // return axios.get(`${routes.sunat}/consultaruc`, {
        // params: params
    // }).then(function (response) {
        // return response.data;
    // }).catch(error => {
        // throw (err.response.data || null)
    // });
}

export function FecthRegistrosSitradoc(numero, page, pageSize) {
    // const params = {
        // numero: numero,
        // page: page,
        // pageSize: pageSize
    // };
    // return axios.get(`${routes.sitradoc}/documento`, {
        // params: params
    // }).then(function (response) {
        // return response.data;
    // }).catch(error => {
        // throw (err.response.data || null)
    // });
}

export function FecthResolucionesSitradoc(numero, page, pageSize) {
    // const params = {
        // numero: numero,
        // page: page,
        // pageSize: pageSize
    // };
    // return axios.get(`${routes.sitradoc}/resolucion`, {
        // params: params
    // }).then(function (response) {
        // return response.data;
    // }).catch(error => {
        // throw (err.response.data || null)
    // });
}


export function FecthNormasLegales(numero, page, pageSize) {
    // const params = {
        // numero: numero,
        // page: page,
        // pageSize: pageSize
    // };
    // return axios.get(`${routes.sitradoc}/normalegal`, {
        // params: params
    // }).then(function (response) {
        // return response.data;
    // }).catch(error => {
        // throw (err.response.data || null)
    // });
}

export function FetchConsultoras(tipo_consultora, descripcion, page, pageSize) {
    // const params = {
        // tipo_consultora: tipo_consultora,
        // descripcion: descripcion,
        // page: page,
        // pageSize: pageSize,
     
    // };
    // return axios.get(`${routes.siscon}/ConsultarLaboratorios`, {
        // params: params
    // }).then(function (response) {
        // return response.data;
    // }).catch(error => {
        // throw (err.response.data || null)
    // });
}

export function FecthPersonasConsultoras(persona, page, pageSize) {
    // const params = {
        // persona: persona,
        // page: page,
        // pageSize: pageSize
    // };
    // return axios.get(`${routes.siscon}/listarPersonaConsultora`, {
        // params: params
    // }).then(function (response) {
        // return response.data;
    // }).catch(error => {
        // throw (err.response.data || null)
    // });
}
