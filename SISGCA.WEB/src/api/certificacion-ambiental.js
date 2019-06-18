import axios from 'axios';

const route = '/api/certificado-ambiental';  

export function FetchCertificaciones(page, pageSize, filters) {
    let params = {
        page: page,
        pageSize: pageSize,
        ...filters
    };

    return axios.get(route, {
        params: params
    }).then(response => response.data).catch((err) => {
        throw (err.response.data || null)
    });
}

export function SaveCertificacion(request) {
    return axios.post(route, request).then(response => response.data).catch(err => {
        throw (err.response.data || null)
    });
}

export function GetCertificacion(id) {
    return axios.get(`${route}/${id}`).then(response => response.data).catch(err => {
        throw (err.response.data || null)
    });
}

export function UpdateCertificacion(id, request) {
    return axios.put(`${route}/${id}`, request).then(response => response.data).catch(err => {
        throw (err.response.data || null)
    });
}

export function DeleteCertificacion(id) {
    return axios.delete(`${route}/${id}`).then(response => response.data).catch(err => {
        throw (err.response.data || null)
    });
}