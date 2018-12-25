import React, { Component } from "react";
import { connect } from "react-redux";

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
  loggedIn: auth.loggedIn
});

class ChatAppBar extends Component {
  state = {
    open: false,
    messageCounter: 0
  };

  componentDidUpdate(prevProps, prevStates) {
    if (this.props.loggedIn) {
      // increment if user did not open pannel
      if (!this.state.open && prevProps.chats.length > 0 && prevProps.chats !== this.props.chats) {
        this.setState({ messageCounter: this.state.messageCounter + 1 });
      }
      if (this.state.open !== prevStates.open) {
        // reset if user toggels pannel
        this.setState({ messageCounter: 0 });
      }
    } else if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({ messageCounter: 0 });
    }
  }

  render() {
    const { classes } = this.props;
    const { messageCounter } = this.state;

    return (
      <Paper className={classes.bottomBar}>
        <Badge invisible={messageCounter === 0} badgeContent={messageCounter} color="primary" style={{ display: "block" }}>
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

export default connect(mapStateToProps)(withStyles(styles)(ChatAppBar));
