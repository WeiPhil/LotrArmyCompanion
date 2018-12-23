import React, { Component } from "react";

import { Typography, Paper, Slide, CardActionArea, Grid } from "@material-ui/core";
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

class ChatAppBar extends Component {
  state = {
    open: false
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.bottomBar}>
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
        <Slide direction="up" in={this.state.open} mountOnEnter unmountOnExit>
          <ChatInterface />
        </Slide>
      </Paper>
    );
  }
}

export default withStyles(styles)(ChatAppBar);
