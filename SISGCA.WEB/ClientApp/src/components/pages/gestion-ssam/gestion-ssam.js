import React from "react";
import AppContainer from "../../shared/layout/app-container";
import TitleBar from "../../shared/title-bar";
import DataTable from "../../shared/datatable";
import Card from "@material-ui/core/Card";
import { initialState } from "./_variables";
import update from "immutability-helper";
import TitleButtons from "./components/title-buttons";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import FormularioSsam from "./components/formulario-ssam";
import FormBuscarSsam from "./components/form-buscar-ssam";
import EditIcon from "@material-ui/icons/Edit";

class GestionSsam extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    setTimeout(() => this.setGridActions());
    this.getPage();
  }

  setGridActions = () => {
    const index = this.state.tableDef.columns.findIndex(
      x => x.propertyName == "acciones"
    );

    const render = (item, loading) => {
      return (
        <>
          <IconButton title="Accion 1" disabled={loading}>
            <EditIcon />
          </IconButton>

          <IconButton title="Accion 2" disabled={loading}>
            <EditIcon />
          </IconButton>

          <IconButton title="Accion 3" disabled={loading}>
            <EditIcon />
          </IconButton>
        </>
      );
    };

    this.setState(
      update(this.state, {
        tableDef: {
          columns: { [index]: { $apply: x => ({ ...x, render: render }) } }
        }
      })
    );
  };

  handleClickNew = () => {
    this.openModalSsam();
  };

  openModalSsam = () => {
    this.setState(
      update(this.state, { modalFormularioSsam: { open: { $set: true } } })
    );
  };

  closeModalSsam = () => {
    this.setState(
      update(this.state, { modalFormularioSsam: { open: { $set: false } } })
    );
  };

  handleChangePage = page => {
    console.log(page);
  };

  handleChangePageSize = pageSize => {
    console.log(pageSize);
  };

  getPage = (
    page = this.state.pagination.page,
    pageSize = this.state.pagination.pageSize
  ) => {
    this.setState({ ...this.state, loading: true }, () => {
      setTimeout(() => {
        const items = [
          {
            nro: 1,
            nombre: "Plantilla de Prueba",
            fechaRegistro: new Date().toUTCString(),
            fechaCierre: new Date().toUTCString(),
            usuario: "amontenegro",
            estadoImplementacion: "En proceso",
            unidadTerritorial: 2
          },
          {
            nro: 2,
            nombre: "Plantilla de Prueba",
            fechaRegistro: new Date().toUTCString(),
            fechaCierre: new Date().toUTCString(),
            usuario: "ralarcon",
            estadoImplementacion: "En proceso",
            unidadTerritorial: 3
          },
          {
            nro: 3,
            nombre: "Plantilla de Prueba",
            fechaRegistro: new Date().toUTCString(),
            fechaCierre: new Date().toUTCString(),
            usuario: "administrador admin",
            estadoImplementacion: "En proceso",
            unidadTerritorial: 1
          }
        ];

        this.setState(
          update(this.state, {
            loading: { $set: false },
            pagination: {
              $set: {
                total: items.length,
                items,
                page: page,
                pageSize: pageSize
              }
            }
          })
        );
      }, 1000);
    });
  };

  render() {
    const {
      loading,
      tableDef,
      pagination,
      title,
      modalFormularioSsam
    } = this.state;

    return (
      <AppContainer responsiveProps={{ lg: 11, md: 11, sm: 12, xs: 12 }}>
        <TitleBar actions={<TitleButtons onClickNew={this.handleClickNew} />}>
          {title}
        </TitleBar>

        <Card>
          <FormBuscarSsam />
        </Card>
        <br />
        <Card>
          <DataTable
            emptyMessage="No hay registros"
            loading={loading}
            tableDef={tableDef}
            pagination={pagination}
            itemsPerPageOptions={[5, 10, 15, 20, 25, 50]}
            onChangePage={this.handleChangePage}
            onChangePageSize={this.handleChangePageSize}
          />
        </Card>

        <Dialog
          open={modalFormularioSsam.open}
          onClose={this.closeModalSsam}
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="md"
          fullWidth
        >
          <FormularioSsam
            modalFormularioSsam={modalFormularioSsam}
            onClose={this.closeModalSsam}
          />
        </Dialog>
      </AppContainer>
    );
  }
}

export default GestionSsam;
