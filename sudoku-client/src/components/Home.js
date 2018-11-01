import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  para: {
    margin: "auto",
    paddingBottom: "10px",
    marginTop: "80px"
  }
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <AppBar title="Home">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Home
              </Typography>
            </Toolbar>
          </AppBar>
          <h1 className={classes.para}>You are on the home page</h1>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
