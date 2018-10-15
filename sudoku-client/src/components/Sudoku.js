import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "./Grid";

class Sudoku extends Component {
  state = {
    digits: [],
    prefilled: [],
    valid: true,
    
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Card>
          <CardContent><Grid/></CardContent>
        </Card>
      </div>
    );
  }
}

export default Sudoku;
