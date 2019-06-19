import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";

const FormBuscarSsam = ({ onSearch }) => {
  return (
    <>
      <form onSubmit={onSearch} autoComplete="off">
        <CardContent>
          <Typography variant="title">Filtros</Typography>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={3} md={2}>
              <TextField label="Número" name="numero" disabled={false} />
            </Grid>

            <Grid item xs={12} sm={3} md={2}>
              <DatePicker
                emptyLabel="dd/mm/yyyy"
                autoOk
                clearable
                label="Buscar desde"
                animateYearScrolling={false}
                disabled={false}
                fullWidth
                cancelLabel="Cancelar"
                disableFuture
                onChange={() => {}}
              />
            </Grid>
          </Grid>
          
          <div>
            <Button
              type="button"
              variant="contained"
              size="small"
              disabled={false}
              onClick={() => {}}
            >
              <Icon>clear_all</Icon>
              Limpiar
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
              disabled={false}
            >
              <SearchIcon />
              Buscar
            </Button>
          </div>
        </CardContent>
      </form>
    </>
  );
};

export default FormBuscarSsam;
