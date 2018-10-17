import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500
  },
  subheader: {
    width: "100%"
  }
});

const mapStateToProps = state => {
  return { sudokuTable: state.sudokuTable };
};

const ConnectedGrid = ({ sudokuTable }, props) => {
  return (
    <div className={styles.root}>
      <GridList
        cellHeight={60}
        className={styles.gridList}
        cols={9}
        spacing={0}
      >
        {sudokuTable.map(row =>
          row.cols.map(cell => (
            <TextField
              id="outlined-bare"
              className={styles.textField}
              disabled={cell.disable}
              defaultValue={cell.value}
              margin="none"
              variant="outlined"
              padding="none"
            />
          ))
        )}
      </GridList>
    </div>
  );
};

const GridListt = connect(mapStateToProps)(ConnectedGrid);

// GridListt.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(GridListt);
