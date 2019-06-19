export const initialState = {
    loading: false,
    title: "Búsqueda de Solicitudes de seguimiento de acciones de Mejora (SSAM)",
    pagination: {
      items: [],
      page: 1,
      pageSize: 5,
      total: 0
    },
    tableDef: {
      propertyKeyName: "nro",
      columns: [
        {
          label: "Nro",
          propertyName: "nro"
        },
        {
          label: "Nombre",
          propertyName: "nombre"
        },
        {
          label: "Fecha Registro",
          propertyName: "fechaRegistro",
          isDate: true
        },
        {
          label: "Fecha Cierre",
          propertyName: "fechaCierre",
          isDate: true
        },
        {
          label: "Usuario",
          propertyName: "usuario"
        },
        {
          label: "Estado implementación",
          propertyName: "estadoImplementacion"
        },
        {
          label: "Unidad territorial",
          propertyName: "unidadTerritorial"
        },
        {
          label: "Acciones",
          propertyName: "acciones",
          render: null
        }
      ]
    },
    
    modalFormularioSsam : {
        open: false,
        title: 'Nueva Solicitud',
        type: 'REGISTRAR',
        isLoading: false,
        ssam: {}
    }
  };