import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "150px",
    width: "300px",
    margin: "auto"
  },
  textField: {
    margin: "auto",
    marginBottom: "15px"
  },
  button: {
    margin: "110px"
  },
  input: {
    display: "none"
  },
  root: {
    flexGrow: 1
  },
  para: {
    margin: "auto",
    paddingBottom: "10px"
  },
  error: {
    color: "red"
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      email: null,
      password: null,
      existingUsers: []
    };
  }

  handleChange(event, inputName) {
    this.setState({ [inputName]: event.target.value });
  }

  handleSubmit = (event, email, password) => {
    event.preventDefault();

    fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        response =>
          response.ok
            ? response.json()
            : Promise.reject("Invalid response from server")
      )
      .then(({ user, token }) => {
        console.log(user);
        window.localStorage.setItem("token", token);
        console.log("Welcome back", user);
        this.props.history.push("/grid");
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <AppBar title="Login">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Login Page
              </Typography>
            </Toolbar>
          </AppBar>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            {this.state.error && (
              <p className={classes.error}>{this.state.error}</p>
            )}
            <TextField
              id="login-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={event => this.handleChange(event, "email")}
            />
            <TextField
              id="login-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              onChange={event => this.handleChange(event, "password")}
            />
            <div className={classes.button}>
              <Button
                id="login-button"
                type="Submit"
                variant="outlined"
                color="primary"
              >
                {"Login"}
              </Button>
            </div>
          </form>
          <p className={classes.para}>Not registered yet? Register Now!</p>
          <Link
            to="/register"
            className={classes.link}
            id="register-page"
            title="Register"
          >
            {"Register"}
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withRouter, withStyles(styles)(Login));
