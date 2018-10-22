import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: "20px"
  },
  input: {
    display: "none"
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
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then(response => response.json())
      .then(newUser => console.log(newUser));
  };

  render() {
    const { classes } = this.props;

    return (
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
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Register
        </Button>
      </form>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
