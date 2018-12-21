import React, { Component } from "react";
import { Typography, TextField, Divider, FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import io from "socket.io-client";

import { USER_CONNECTED, LOGOUT, VERIFY_USER } from "./../../../gameServer/Events";

import ChatContainer from "./ChatContainer";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 3
  },
  divider: {
    margin: theme.spacing.unit
  }
});

const socketUrl = "http://localhost:3231";

class BattleMainInterface extends Component {
  state = {
    socket: null,
    socketInfo: "Disconnected",
    user: null,
    error: false
  };

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      this.setState({ socketInfo: "Connected" });
    });

    this.setState({ socket });
  };

  setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      this.setState({ error: true });
    } else {
      const { socket } = this.state;
      socket.emit(USER_CONNECTED, user);
      this.setState({ user, error: false });
    }
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { socket } = this.state;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  };

  render() {
    const { classes } = this.props;
    const { error, user, socket } = this.state;

    return (
      <div className={classes.container}>
        <Typography align="center" variant="h3" gutterBottom>
          Welcome to the battle Interface!
        </Typography>
        <Divider className={classes.divider} />

        {!user ? (
          <form className={classes.container} onSubmit={this.handleSubmit} style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              error={error}
              id="nickname"
              label="Nickname"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("nickname")}
              margin="normal"
            />
            {error && <FormHelperText error>User Already connected</FormHelperText>}
          </form>
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BattleMainInterface);
