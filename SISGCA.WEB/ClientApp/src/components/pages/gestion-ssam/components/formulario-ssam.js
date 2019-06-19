import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class FormularioSsam extends React.Component {
  render() {
    const { modalFormularioSsam, onClose } = this.props;

    return (
      <>
        <DialogTitle id="form-dialog-title">
          {modalFormularioSsam.title}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Proceso"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Requisito del SIG"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Descripción del hallazgo"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Tipo de hallazgo"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Problema"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Causas del problema"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Consecuencias"
                type="text"
                fullWidth
              />
            </Grid>


            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Fecha Inicio"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Fecha Fin"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Acciones"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Recursos"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Metas/Indicadores"
                type="text"
                fullWidth
              />
            </Grid>


            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Medio de verificación"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Responsable"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Unidad Responsable"
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Actividad/Tarea"
                type="text"
                fullWidth
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </>
    );
  }
}

export default FormularioSsam;
