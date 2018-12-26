import React, { Component } from "react";
import { connect } from "react-redux";

import { resetMessageCounter } from "./../../../redux/actions/chat";

import { Typography, Paper, Slide, CardActionArea, Grid, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MailIcon } from "./../../icons/MenuIcons";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

import ChatInterface from "./ChatInterface";

const styles = theme => ({
  bottomBar: {
    position: "fixed",
    top: "auto",
    bottom: -2,
    right: "5vw",
    minWidth: "30vw",
    [theme.breakpoints.down("xs")]: {
      minWidth: "70vw"
    }
  },
  icon: {
    color: theme.palette.type === "dark" ? "#CCCCCC" : theme.palette.secondary.main
  },
  content: {
    padding: theme.spacing.unit
  }
});

const mapStateToProps = ({ chat, auth }) => ({
  chats: chat.chats,
  loggedIn: auth.loggedInm,
  messageCounter: chat.messageCounter
});

class ChatAppBar extends Component {
  state = {
    open: false,
    messageCounter: 0
  };

  componentDidUpdate(prevProps, prevStates) {
    // increment if user did not open pannel
    if (this.state.open !== prevStates.open) {
      // reset if user toggels pannel
      this.props.resetMessageCounter();
    }
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.props.resetMessageCounter();
    }
  }

  render() {
    const { classes, messageCounter } = this.props;

    return (
      <Paper className={classes.bottomBar}>
        <Badge
          invisible={messageCounter === 0 || this.state.open}
          badgeContent={messageCounter}
          color="primary"
          style={{ display: "block" }}
        >
          <CardActionArea onClick={() => this.setState({ open: !this.state.open })} className={classes.content}>
            <Grid container justify="space-between">
              <Grid item>
                <MailIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" color="textSecondary">
                  Minimal Chat
                </Typography>
              </Grid>
              <Grid item>{this.state.open ? <ExpandMore className={classes.icon} /> : <ExpandLess className={classes.icon} />}</Grid>
            </Grid>
          </CardActionArea>
        </Badge>
        <Slide direction="up" in={this.state.open} mountOnEnter unmountOnExit>
          <ChatInterface />
        </Slide>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  { resetMessageCounter }
)(withStyles(styles)(ChatAppBar));
