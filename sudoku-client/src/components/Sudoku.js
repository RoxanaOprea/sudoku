import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "./Grid";
import Header from './Header';
import Buttons from './Buttons';

class Sudoku extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Card>
          <CardContent>
            <Grid />
          </CardContent>
        </Card>
        <Buttons/>
      </div>
    );
  }
}

export default Sudoku;
