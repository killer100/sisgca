import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DataTablePaginatorActions from "./datatable-paginator-actions";
import DataTableHeader from "./datatable-header";
import Moment from "./moment";
import grey from "@material-ui/core/colors/grey";
import LinearProgress from "@material-ui/core/LinearProgress";
import { REDRAW_TABLE_TYPE } from "../../constants/enums";

const heightRow = 57;

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  rowNoRecords: {
    height: heightRow
  },
  cellNoRecords: {
    textAlign: "center",
    borderBottom: 0
  },
  tableRow: {
    height: heightRow
  },
  odd: {
    backgroundColor: grey[200]
  },
  loaderContainer: {
    height: 5
  }
});

class DataTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        items: []
      },
      error: false,
      itemsPorPaginaOpts: [5, 10, 15, 20, 25],
      loading: false
    };
  }

  handleChangePageSize = event => {
    const { filters } = this.props;
    this.loadData(1, event.target.value, filters);
  };

  handleChangePage = page => {
    const { pagination } = this.state;
    const { filters } = this.props;
    this.loadData(page + 1, pagination.pageSize, filters);
  };

  renderColumn = (col, item, index) => {
    let value = col.propertyName ? eval("item." + col.propertyName) : null;
    return (
      <TableCell scope="row" key={index} style={col.tdStyle}>
        {col.custom === true ? (
          col.render(item, this.state.loading)
        ) : col.isDate === true ? (
          <Moment date={value} />
        ) : (
          value
        )}
      </TableCell>
    );
  };

  loadData(page, pageSize, filters) {
    if (typeof this.props.beforeLoadElements === "function")
      this.props.beforeLoadElements();
    this.setState({ loading: true, error: false });
    this.props
      .getData(page, pageSize, filters)
      .then(Response => {
        this.setState({ pagination: Response.data.pagination, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true, loading: false });
      })
      .finally(() => {
        if (typeof this.props.onElementsDidLoad === "function")
          this.props.onElementsDidLoad();
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.redraw) {
      switch (this.props.redraw) {
        case REDRAW_TABLE_TYPE.RESET:
          this.handleChangePage(0);
          break;
        case REDRAW_TABLE_TYPE.RELOAD:
          this.refresh();
          break;
      }
      this.props.onRedrawFinish(REDRAW_TABLE_TYPE.NONE);
    }
  }

  refresh() {
    const { pagination } = this.state;
    const { filters } = this.props;
    this.loadData(pagination.page, pagination.pageSize, filters);
  }

  componentDidMount() {
    const { pagination } = this.state;
    const { filters, loadOnInit } = this.props;
    const pageSize = this.props.pageSize
      ? this.props.pageSize
      : pagination.pageSize;
    this.setState({ pagination: { ...pagination, pageSize: pageSize } });

    if (loadOnInit) {
      this.loadData(pagination.page, pageSize, filters);
    }
  }

  render() {
    const { pagination, loading, error } = this.state;
    const { classes, tableDef, emptyMessage } = this.props;

    let rows = [];

    let emptyRows =
      pagination.pageSize -
      Math.min(
        pagination.pageSize,
        pagination.total - (pagination.page - 1) * pagination.pageSize
      );

    if (pagination.total === 0) {
      emptyRows = pagination.pageSize - 1;
      rows.push(
        <TableRow key={0} className={classes.rowNoRecords}>
          <TableCell
            className={classes.cellNoRecords}
            colSpan={tableDef.columns.length}
          >
            {loading
              ? "Cargando resultados..."
              : error
                ? "Ocurrió un error al cargar los datos"
                : emptyMessage || "No se encontraron registros"}
          </TableCell>
        </TableRow>
      );
    } else {
      rows = pagination.items.map((item, index) => (
        <TableRow
          key={item[tableDef.propertyKeyName]}
          className={(index % 2 ? classes.odd : null) + " " + classes.tableRow}
        >
          {tableDef.columns.map((col, index) =>
            this.renderColumn(col, item, index)
          )}
        </TableRow>
      ));
    }

    return (
      // <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <div className={classes.loaderContainer}>
          {loading && <LinearProgress />}
        </div>
        <Table className={classes.table}>
          <DataTableHeader columns={tableDef.columns} />
          <TableBody>
            {rows}
            {emptyRows > 0 && (
              <TableRow style={{ height: heightRow * emptyRows }}>
                <TableCell colSpan={tableDef.columns.length} />
              </TableRow>
            )}
          </TableBody>
          {pagination.total > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Filas por página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `Filas del ${from} al ${to} de un total de ${count}`
                  }
                  colSpan={tableDef.columns.length}
                  count={pagination.total}
                  rowsPerPage={pagination.pageSize}
                  page={pagination.page - 1}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangePageSize}
                  ActionsComponent={DataTablePaginatorActions}
                  nextIconButtonProps={{ disabled: loading }}
                  rowsPerPageOptions={
                    this.props.itemsPorPaginaOpts ||
                    this.state.itemsPorPaginaOpts
                  }
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      // </Paper>
    );
  }
}

DataTable.defaultProps = {
  loadOnInit: true
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableDef: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
  itemsPorPaginaOpts: PropTypes.array,
  filters: PropTypes.object,
  redraw: PropTypes.oneOf([
    REDRAW_TABLE_TYPE.NONE,
    REDRAW_TABLE_TYPE.RELOAD,
    REDRAW_TABLE_TYPE.RESET
  ]),
  onRedrawFinish: PropTypes.func,
  pageSize: PropTypes.number,
  loadOnInit: PropTypes.bool,
  beforeLoadElements: PropTypes.func,
  onElementsDidLoad: PropTypes.func
};

export default withStyles(styles)(DataTable);
