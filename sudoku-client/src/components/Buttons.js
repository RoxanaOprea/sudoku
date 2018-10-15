import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Buttons extends Component {
  render() {
    return (
      <div>
        <Button variant="outlined" size="medium" color="primary">
          Reset Game
        </Button>

        <Button variant="outlined" size="medium" color="secondary">
          Check number
        </Button>
      </div>
    );
  }
}

export default Buttons;
