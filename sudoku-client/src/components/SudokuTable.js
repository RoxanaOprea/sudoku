import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Div = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #3f51b5;
`;

class SudokuTable extends Component {
  render() {
    const cell = [];
    const numbers = this.props.numbers || [];
    return (
      <div>
        <Card>
          <CardContent>
            <Div />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SudokuTable;
