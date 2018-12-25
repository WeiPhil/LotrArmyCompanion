import React, { Component } from "react";
import { connect } from "react-redux";

import { sendMessage } from "../../../redux/actions/chat";

import { List, ListItem, ListItemText, Typography, Paper, Divider, TextField, Icon, IconButton, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const mapStateToProps = ({ chat, auth }) => ({
  username: auth.username,
  loggedIn: auth.loggedIn,
  chats: chat.chats,
  activeChat: chat.activeChat
});

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
    display: "flex",
    flexDirection: "column"
  },
  chatMessages: {
    display: "flex",
    flexDirection: "column",
    height: "50vh",
    overflow: "auto",
    marginTop: -19
  },
  theirPaper: {
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.light + "CC"
  },
  myPaper: {
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.light + "CC"
  },
  theirChats: {
    maxWidth: "30vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "70vw"
    },
    flexWrap: "wrap",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    alignSelf: "flex-start"
  },
  myChats: {
    flexWrap: "wrap",
    maxWidth: "30vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "70vw"
    },
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    alignSelf: "flex-end"
  },
  messageBar: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    alignItems: "flex-end"
  }
});

class ChatContainer extends Component {
  state = {
    menuAnchor: undefined,
    message: "",
    isTyping: false
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  sendMessage = event => {
    event.preventDefault();

    const { message } = this.state;
    const { activeChat } = this.props;
    if (message !== "" && activeChat != null) {
      this.props.sendMessage({ chatId: activeChat.id, message: message });
      this.setState({ message: "" });
    }
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    const { username, classes, activeChat, chats } = this.props;

    return (
      <>
        <div className={classes.chatList}>
          {/* <div className={classes.chatHeader}>
            <IconButton
              onClick={event => this.setState({ menuAnchor: event.currentTarget })}
              aria-owns={menuAnchor ? "chat-menu-options" : undefined}
              style={{ margin: "0px 0px 0px auto" }}
            >
              <Icon fontSize="small">more_vert</Icon>
            </IconButton>
            <Menu
              id="chat-menu-options"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => this.setState({ menuAnchor: null })}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div> */}
          <Divider />
          <br />
          <div className={classes.chatMessages}>
            {activeChat !== null ? (
              activeChat.messages.map((mes, key) => {
                const chatClassName = username === mes.sender ? classes.myChats : classes.theirChats;
                const paperClassName = username === mes.sender ? classes.myPaper : classes.theirPaper;
                return (
                  <div key={key} className={chatClassName}>
                    <Paper elevation={2} className={paperClassName}>
                      <Typography color="textPrimary" variant="body2">
                        {mes.message}
                      </Typography>
                      <Typography style={{ textAlign: "right", fontSize: "10px" }} color="textSecondary" variant="body2">
                        {mes.time}
                      </Typography>
                      {/* {typingUsers.length > 0 && <Typography>writing...</Typography>} */}
                    </Paper>
                    <Typography style={{ textAlign: "right", fontSize: "10px" }} color="textSecondary" variant="body2">
                      {mes.sender}
                    </Typography>
                  </div>
                );
              })
            ) : (
              <List>
                {chats.map((chat, key) => {
                  if (chat.name) {
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    const connectedUser = chat.users.find(({ name }) => {
                      return name !== this.props.name;
                    }) || { name: "Community" };
                    const classNames = activeChat && activeChat.id === chat.id ? "active" : "";

                    return (
                      <ListItem key={key}>
                        <ListItemText
                          className={classNames}
                          onClick={() => {
                            this.setActiveChat(chat);
                          }}
                          primary={
                            <Button
                              onClick={() => {
                                this.setActiveChat(chat);
                              }}
                            >
                              {connectedUser.name}
                            </Button>
                          }
                          secondary={lastMessage && lastMessage.message}
                        />
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </List>
            )}
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
        </div>
        <Divider />
        <form onSubmit={this.sendMessage} className={classes.messageBar}>
          <TextField
            onChange={this.handleMessageChange}
            style={{ marginBottom: "10px" }}
            fullWidth
            value={this.state.message}
            placeholder={"Enter Message"}
          />
          <IconButton onClick={this.sendMessage}>
            <Icon fontSize="small">send</Icon>
          </IconButton>
        </form>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  { sendMessage }
)(withStyles(styles, { withTheme: true })(ChatContainer));
