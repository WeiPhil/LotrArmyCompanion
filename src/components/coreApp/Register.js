import React, { Component } from "react";

import { connect } from "react-redux";
import { register, closeRegisterSuccessDialog, internalErrorHandled } from "./../../redux/actions/auth";

import { VisibilityOff, Visibility } from "@material-ui/icons";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  CircularProgress,
  FormHelperText,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Grid
} from "@material-ui/core";
import { FORM_FIELD_WIDTH } from "../../utils/Constants";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit
  },
  registerButton: {
    marginLeft: "60%",
    [theme.breakpoints.up("lg")]: {
      marginLeft: "35%"
    }
  },
  button: {
    width: "70%",
    margin: "0 auto",
    marginBottom: theme.spacing.unit * 2
  },
  dialog: {
    padding: theme.spacing.unit * 3
  }
});

const mapStateToProps = ({ auth }) => ({
  registering: auth.registering,
  authMessage: auth.authMessage,
  registerSuccess: auth.registerSuccess,
  internalErrorCode: auth.internalErrorCode
});

class Register extends Component {
  state = {
    form: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    showPassword: false,
    termsOfService: false,
    error: {
      firstName: false,
      lastName: false,
      email: false,
      username: false,
      password: false,
      confirmPassword: false
    },
    showSuccessDialog: false
  };

  handleChange = prop => event => {
    if (prop === "termsOfService") {
      this.setState({ [prop]: event.target.checked });
    } else {
      var formTemp = { ...this.state.form };
      var errorTmp = { ...this.state.error };
      errorTmp[prop] = false;
      formTemp[prop] = event.target.value;
      this.setState({ form: formTemp });
      this.setState({ error: errorTmp });
    }
    if (prop === "username" && this.props.internalErrorCode === 101) {
      this.props.internalErrorHandled();
    }
    if (prop === "email" && this.props.internalErrorCode === 102) {
      this.props.internalErrorHandled();
    }
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = event => {
    event.preventDefault();
    var errorTmp = { ...this.state.error };

    const error = Object.keys(this.state.form).reduce((acc, key) => {
      if (this.state.form[key] === "") {
        errorTmp[key] = true;
        return acc || true;
      }
      if (!this.state.form.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        errorTmp[key] = true;
        return acc || true;
      }
      if (this.state.form.password !== this.state.form.confirmPassword) {
        errorTmp.password = true;
        errorTmp.confirmPassword = true;
      }
      return acc || false;
    }, false);

    this.setState({ error: errorTmp });

    if (!error) {
      const submitData = {
        firstName: this.state.form.firstName,
        lastName: this.state.form.lastName,
        email: this.state.form.email,
        username: this.state.form.username,
        password: this.state.form.password
      };

      this.props.register(submitData);
    }
  };

  render() {
    const { classes } = this.props;

    const fieldStyle = { maxWidth: FORM_FIELD_WIDTH };
    const fieldStylePassword = { maxWidth: FORM_FIELD_WIDTH * 0.7 };

    return (
      <form className={classes.container}>
        <Grid container direction={"column"}>
          <Grid item>
            <TextField
              variant="outlined"
              required
              error={this.state.error["firstName"]}
              id="first-name"
              label="First Name"
              value={this.state.form.firstName}
              onChange={this.handleChange("firstName")}
              margin="normal"
              style={fieldStyle}
              fullWidth
            />
            {this.state.error["firstName"] && <FormHelperText error>This is a requied field</FormHelperText>}
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              required
              error={this.state.error["lastName"]}
              id="last-name"
              label="Last Name"
              value={this.state.form.lastName}
              onChange={this.handleChange("lastName")}
              margin="normal"
              style={fieldStyle}
              fullWidth
            />
            {this.state.error["lastName"] && <FormHelperText error>This is a requied field</FormHelperText>}
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              required
              error={this.state.error["email"]}
              id="email"
              label="Email"
              value={this.state.form.email}
              onChange={this.handleChange("email")}
              margin="normal"
              style={fieldStyle}
              fullWidth
            />
            {this.state.error["email"] && <FormHelperText error>Enter a valid email address </FormHelperText>}
            {this.props.internalErrorCode === 102 && <FormHelperText error>{this.props.authMessage}</FormHelperText>}
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              required
              error={this.state.error["username"]}
              id="username"
              label="Username"
              value={this.state.form.username}
              onChange={this.handleChange("username")}
              margin="normal"
              style={fieldStyle}
              fullWidth
            />
            {this.state.error["username"] && <FormHelperText error>This is a requied field</FormHelperText>}
            {this.props.internalErrorCode === 101 && <FormHelperText error>{this.props.authMessage}</FormHelperText>}
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              required
              error={this.state.error["password"]}
              id="password"
              label="Password"
              value={this.state.form.password}
              onChange={this.handleChange("password")}
              margin="normal"
              type={this.state.showPassword ? "text" : "password"}
              style={fieldStylePassword}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                      {this.state.showPassword ? <VisibilityOff fontSize={"small"} /> : <Visibility fontSize={"small"} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              required
              error={this.state.error["confirmPassword"]}
              id="password-confirm"
              label="Confirm Password"
              value={this.state.form.confirmPassword}
              onChange={this.handleChange("confirmPassword")}
              margin="normal"
              type="password"
              style={fieldStylePassword}
              fullWidth
            />
            {(this.state.error["password"] || this.state.error["confirmPassword"]) && (
              <FormHelperText error>Enter twice the same password</FormHelperText>
            )}
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Checkbox checked={this.state.termsOfService} onChange={this.handleChange("termsOfService")} value="termsOfService" />
              }
              label="I have read and I accept the Terms of Service *"
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!this.state.termsOfService || this.props.registering}
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              type="submit"
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <Dialog onClose={this.props.closeRegisterSuccessDialog} open={this.props.registerSuccess}>
          <DialogTitle align="center">{"Register Complete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.authMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.button}
              onClick={this.props.closeRegisterSuccessDialog}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.props.registering}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
              overflow: "hidden"
            }
          }}
        >
          <CircularProgress />
        </Dialog>
      </form>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { register, closeRegisterSuccessDialog, internalErrorHandled }
)(withStyles(styles)(Register));
