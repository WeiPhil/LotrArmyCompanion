import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import ChatContainer from "./ChatContainer";

const styles = theme => ({
  container: {
    paddingTop: 0,
    padding: theme.spacing.unit * 3
  }
});

const mapStateToProps = ({ auth }) => ({
  username: auth.username,
  loggedIn: auth.loggedIn
});

class ChatInterface extends Component {
  render() {
    const { classes, username, loggedIn } = this.props;

    return (
      <div className={classes.container}>
        {!loggedIn ? (
          <Typography variant="subtitle2" color="textSecondary">
            Not connected
          </Typography>
        ) : (
          <ChatContainer username={username} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ChatInterface));
