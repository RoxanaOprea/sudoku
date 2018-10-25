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
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
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
      .then(response => response.json())
      .then(user => console.log(`Login ${user}`))
      .catch(err => console.log(err));
      
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider>
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
              <TextField
                id="outlined-email-input"
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
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                onChange={event => this.handleChange(event, "password")}
              />
              <div className={classes.button}>
                <Button type="Submit" variant="outlined" color="primary">
                  Login
                </Button>
              </div>
            </form>
            <p className={classes.para}>Not registered yet? Register Now!</p>
            <Link to="/register">Register</Link>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
