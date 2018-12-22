import React, { Component } from "react";
import { Typography, Paper, Divider, TextField, Icon, IconButton, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { MESSAGE_SENT } from "./../../../gameServer/Events";

const styles = theme => ({
  chatHeader: {
    display: "flex",
    marginBottom: theme.spacing.unit
  },
  chatContainer: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  },
  chatList: {
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing.unit * 4
  },
  theirChats: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    maxWidth: "30vw",
    alignSelf: "flex-start",
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.light + "CC"
  },
  myChats: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    maxWidth: "30vw",
    alignSelf: "flex-end",
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.light + "CC"
  },
  messageBar: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    alignItems: "flex-end"
  }
});

class ChatContainer extends Component {
  state = {
    chats: [],
    activeChat: null,
    message: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { socket, user } = this.props;
    const { message } = this.state;
    if (message !== "") socket.emit(MESSAGE_SENT, this.state.message, user.name);
  };

  render() {
    const { logout, user, classes } = this.props;
    // const { chats, activeChat } = this.state;

    return (
      <>
        <Paper className={classes.chatContainer} elevation={1}>
          <div className={classes.chatList}>
            <div className={classes.chatHeader}>
              <Typography variant="subtitle2" color="textSecondary" style={{ display: "inline-block" }}>
                A Minimal Chat - Logged as {user.name}
              </Typography>
              <IconButton style={{ margin: "0px 0px 0px auto" }}>
                <Icon fontSize="small">more_vert</Icon>
              </IconButton>
            </div>
            <Divider />
            <br />
            <Paper className={classes.myChats} elevation={2}>
              <Typography color="textSecondary" variant="body2">
                Hello World
              </Typography>
            </Paper>

            <Paper className={classes.theirChats} elevation={2}>
              <Typography color="textSecondary" variant="body2">
                Hello You
              </Typography>
            </Paper>
            <Paper className={classes.myChats} elevation={2}>
              <Typography color="textSecondary" variant="body2">
                How are you?
              </Typography>
            </Paper>
            <Paper className={classes.theirChats} elevation={2}>
              <Typography color="textSecondary" variant="body2">
                Fine and you?
              </Typography>
            </Paper>
            <Paper className={classes.myChats} elevation={2}>
              <Typography color="textSecondary" variant="body2">
                I feel really great today man just talking with myself!
              </Typography>
            </Paper>
          </div>
          <Divider />
          <form onSubmit={this.handleSubmit} className={classes.messageBar}>
            <TextField style={{ marginBottom: "10px" }} fullWidth placeholder={"Enter Message"} />
            <IconButton>
              <Icon fontSize="small">send</Icon>
            </IconButton>
          </form>
        </Paper>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChatContainer);
