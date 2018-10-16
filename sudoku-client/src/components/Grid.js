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
        value: 5,
        disable: true
      },
      {
        value: 3,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 7,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
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
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: 6,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 1,
        disable: true
      },
      {
        value: 9,
        disable: true
      },
      {
        value: 5,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: null,
        disable: false
      },
      {
        value: 9,
        disable: true
      },
      {
        value: 8,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 6,
        disable: true
      },
      {
        value: null,
        disable: false
      }
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: 8,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 6,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 3,
        disable: true
      }
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: 4,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 8,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: 3,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 1,
        disable: true
      }
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: 7,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 2,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 6,
        disable: true
      }
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: null,
        disable: false
      },
      {
        value: 6,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 2,
        disable: true
      },
      {
        value: 8,
        disable: true
      },
      {
        value: null,
        disable: false
      }
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 4,
        disable: true
      },
      {
        value: 1,
        disable: true
      },
      {
        value: 9,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 5,
        disable: true
      }
    ]
  },
  {
    number: 1,
    digit: "3",
    cols: [
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 8,
        disable: true
      },
      {
        value: null,
        disable: false
      },
      {
        value: null,
        disable: false
      },
      {
        value: 7,
        disable: true
      },
      {
        value: 9,
        disable: true
      }
    ]
  },
];

function GridListt(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={60} className={classes.gridList} cols={9} spacing={0}>
        {sudokuTable.map(row =>
          row.cols.map(cell => (
            <TextField
              id="outlined-bare"
              className={classes.textField}
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
}

GridListt.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GridListt);
