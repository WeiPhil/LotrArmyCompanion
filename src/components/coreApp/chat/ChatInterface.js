import React, { Component } from "react";
import { TextField, FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import io from "socket.io-client";

import { USER_CONNECTED, LOGOUT, VERIFY_USER } from "../../../server/Events";

import ChatContainer from "./ChatContainer";
import { HOST_NAME } from "../../../utils/Constants";

const styles = theme => ({
  container: {
    paddingTop: 0,
    padding: theme.spacing.unit * 3
  }
});

const socketUrl = "http://" + HOST_NAME + ":3231";

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
    const socket = io.connect(
      socketUrl,
      {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      }
    );
    socket.on("connect", () => {
      this.setState({ socketInfo: "Connected" });
    });

    this.setState({ socket });
  };

  setUser = ({ user, isUser }) => {
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
