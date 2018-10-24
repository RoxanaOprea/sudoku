import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "150px",
    width: "300px",
    margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: "65px"
  },
  input: {
    display: "none"
  },
  smallContainer: {
    width: "200px",
    margin: "auto",
  },
  link: {
    marginRight: "50px"
  }
});

class Register extends React.Component {
  state = {
    user: [{ email: "", password: "" }]
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.user,
        password: this.state.password
      }),
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json())
      .then(newUser => console.log(newUser));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Registration">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Registration Page
              </Typography>
            </Toolbar>
          </AppBar>
          <div>
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <TextField
                id="register-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="register-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Register
              </Button>
            </form>
            <div className={classes.smallContainer}>
              <Link to="/" className={classes.link}>Back to Login Page</Link>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
