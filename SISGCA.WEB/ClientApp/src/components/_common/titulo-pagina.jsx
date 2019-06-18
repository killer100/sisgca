import React from "react";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  tituloPagina: {
    color: grey[600],
    fontWeight: 400,
    padding: 5
  },
  backButton: {
    position: "relative",
    margin: theme.spacing.unit,
    backgroundColor: "#dadada",
    boxShadow: "none",
    top: -2,
    [theme.breakpoints.up("md")]: {
      left: -2 * theme.spacing.unit
    }
  }
});

const TituloPagina = ({ texto, classes, back, history }) => {
  let onClick = () => {
    if (history) history.push(back);
  };
  return (
    <div>
      <h3 className={classes.tituloPagina}>
        {back && (
          <IconButton
            variant="fab"
            aria-label="back"
            className={classes.backButton}
            onClick={onClick}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {texto}
      </h3>
    </div>
  );
};

export default withStyles(styles)(TituloPagina);
