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
    margin: "auto"
  },
  link: {
    marginRight: "50px"
  }
});

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      newUsers: []
    };
  }

  handleChange(event, inputName) {
    this.setState({ [inputName]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        const users = this.state.newUsers;
        users.push({ email: res.email, password: res.password });

        this.setState({ newUsers: users });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.newUsers);

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
                onChange={event => this.handleChange(event, "email")}
              />
              <TextField
                id="register-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                onChange={event => this.handleChange(event, "password")}
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
              <Link to="/" className={classes.link}>
                Back to Login Page
              </Link>
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
