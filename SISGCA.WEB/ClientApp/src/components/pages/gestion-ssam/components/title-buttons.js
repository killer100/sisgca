import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const TitleButtons = ({ onClickNew }) => (
  <div>
    <Button color="primary" onClick={onClickNew}>
      <AddIcon />
      Nuevo
    </Button>
  </div>
);

export default TitleButtons;
