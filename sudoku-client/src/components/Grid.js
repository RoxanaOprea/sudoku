import React from "react";
import GridList from "@material-ui/core/GridList";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import utils from "../js/helpers/utils";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: 500,
    marginTop: "120px",
    margin: "auto"
  },
  subheader: {
    width: "100%"
  }
};

class ConnectedGrid extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(row, col) {
    //console.log("row: ", row, "--> col: ", col);
    const isValid = utils.validation(row, col);
  }

  render() {
    return (
      <div style={styles.root}>
       <div>
          <AppBar title="Grid">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Sudoku Game
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <GridList cellHeight={60} style={styles.gridList} cols={9} spacing={0}>
          {this.props.sudokuTable.map((row, indexR) =>
            row.cols.map((cell, indexC) => (
              <TextField
                id="outlined-bare"
                style={styles.textField}
                disabled={cell.disable}
                defaultValue={cell.value}
                onChange={() => this.handleChange(indexR, indexC)}
                margin="none"
                variant="outlined"
                padding="none"
              />
            ))
          )}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { sudokuTable: state.sudokuTable };
};

const GridListt = connect(mapStateToProps)(ConnectedGrid);

export default GridListt;
