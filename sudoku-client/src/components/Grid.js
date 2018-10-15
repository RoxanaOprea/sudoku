import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";


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

const cells = [
  {
    number: 1,
    digit: "3",
    cols: 9
  }
];

function GridListt(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={60} className={classes.gridList} cols={9}>
        {cells.map(cell => (
          <GridListTile key={cell.number} cols={cell.cols || 1}>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

GridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GridListt);
