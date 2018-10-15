import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  subheader: {
    width: "100%"
  }
});

const sudokuTable = [
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: 3,
        disable: true
      },
      {
        value: 5,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      }
    ]
  }
];

function GridListt(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={60} className={classes.gridList} cols={9}>
        {sudokuTable.map(row =>
          row.cols.map(cell => (
            <TextField
              id="outlined-bare"
              className={classes.textField}
              disabled={cell.disable}
              defaultValue={cell.value}
              margin="normal"
              variant="outlined"
            />
          ))
        )}
      </GridList>
    </div>
  );
}

GridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GridListt);
