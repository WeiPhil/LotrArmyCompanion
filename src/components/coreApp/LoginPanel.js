import React, { Component } from "react";

import { VisibilityOff, Visibility, Lock } from "@material-ui/icons";
import PropTypes from "prop-types";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
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

class LoginPanel extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    rememberMe: false
  };

  handleChange = prop => event => {
    if (prop === "rememberMe") {
      this.setState({ [prop]: event.target.checked });
    } else {
      this.setState({ [prop]: event.target.value });
    }
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  login = () => {};

  render() {
    const { loginOpen, classes, handleLoginClose } = this.props;

    return (
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
                value={this.state.username}
                onChange={this.handleChange("username")}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password-field"
                label="Password"
                placeholder="Password"
                className={classNames(classes.margin, classes.textField)}
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
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
                <Button variant="contained" className={classes.button} onClick={this.login} color="secondary">
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
    );
  }
}

LoginPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  loginOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoginPanel);
