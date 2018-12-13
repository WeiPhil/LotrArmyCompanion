import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";

import { login, internalErrorHandled } from "./../../redux/actions/auth";

import { VisibilityOff, Visibility, Lock } from "@material-ui/icons";
import PropTypes from "prop-types";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Typography,
  DialogActions,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  Grid
} from "@material-ui/core";

import InlineLink from "./../customs/InlineLink";

const styles = theme => ({
  dialog: {
    padding: theme.spacing.unit * 1.5,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 3
  },
  margin: {
    margin: theme.spacing.unit
  },
  button: {
    width: "100%",
    margin: "0 auto",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const mapStateToProps = ({ auth }) => ({
  username: auth.username,
  logging: auth.logging,
  authMessage: auth.authMessage,
  internalErrorCode: auth.internalErrorCode,
  loggedIn: auth.loggedIn
});

class LoginPanel extends Component {
  state = {
    form: {
      username: "",
      password: ""
    },
    showPassword: false,
    rememberMe: false,
    error: {
      username: false,
      password: false
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.props.handleLoginClose();
    }
  }

  handleChange = prop => event => {
    if (prop === "rememberMe") {
      this.setState({ [prop]: event.target.checked });
    } else {
      var formTemp = { ...this.state.form };
      var errorTmp = { ...this.state.error };
      errorTmp[prop] = false;
      formTemp[prop] = event.target.value;
      this.setState({ form: formTemp });
      this.setState({ error: errorTmp });
    }

    if (prop === "username" && this.props.internalErrorCode === 103) {
      this.props.internalErrorHandled();
    }
    if (prop === "email" && this.props.internalErrorCode === 104) {
      this.props.internalErrorHandled();
    }
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  login = () => {
    var errorTmp = { ...this.state.error };

    const error = Object.keys(this.state.form).reduce((acc, key) => {
      if (this.state.form[key] === "") {
        errorTmp[key] = true;
        return acc || true;
      }
      return acc || false;
    }, false);

    this.setState({ error: errorTmp });

    if (!error) {
      const logindata = {
        username: this.state.form.username,
        password: this.state.form.password
      };
      this.props.login(logindata);
    }
  };

  render() {
    const { loggedIn, loginOpen, classes, handleLoginClose, logging, internalErrorCode, authMessage } = this.props;

    return (
      <>
        <Dialog open={loginOpen} onClose={handleLoginClose}>
          <DialogTitle align="center">
            <Typography>
              <Lock />
            </Typography>
            Login
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <Grid container direction={"column"}>
              <Grid item>
                <TextField
                  id="username-field"
                  label="Username"
                  placeholder="Username"
                  className={classNames(classes.margin)}
                  value={this.state.form.username}
                  onChange={this.handleChange("username")}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                {this.state.error["username"] && <FormHelperText error>Enter a username</FormHelperText>}
                {internalErrorCode === 103 && <FormHelperText error>{authMessage}</FormHelperText>}
              </Grid>
              <Grid item>
                <TextField
                  id="password-field"
                  label="Password"
                  placeholder="Password"
                  className={classNames(classes.margin, classes.textField)}
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.form.password}
                  onChange={this.handleChange("password")}
                  InputLabelProps={{
                    shrink: true
                  }}
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
                {this.state.error["password"] && <FormHelperText error>Enter a password</FormHelperText>}
                {internalErrorCode === 104 && <FormHelperText error>{authMessage}</FormHelperText>}
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox checked={this.state.rememberMe} onChange={this.handleChange("rememberMe")} value="rememberMe" />}
                  label="Remember me"
                />
              </Grid>

              <Grid item>
                <InlineLink onClick={handleLoginClose} style={{ fontSize: "10px" }} text={"Password forgotten?"} />
              </Grid>
              <Grid item>
                <DialogActions>
                  <Button disabled={logging} variant="contained" className={classes.button} onClick={this.login} color="secondary">
                    Sign In
                  </Button>
                </DialogActions>
              </Grid>
              <Grid container justify={"flex-end"}>
                <Grid item>
                  <InlineLink onClick={handleLoginClose} path={"/register"} text={"Create new account"} />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog
          open={logging}
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
        {loginOpen && loggedIn && <Redirect to="/myCompanies" />}
      </>
    );
  }
}

LoginPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  loginOpen: PropTypes.bool.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { login, internalErrorHandled }
  )(withStyles(styles)(LoginPanel))
);
