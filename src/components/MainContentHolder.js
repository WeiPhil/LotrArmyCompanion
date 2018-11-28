import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  contentHolder: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbarSpace: theme.mixins.toolbar
});

export class MainContentHolder extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentHolder}>
        <div className={classes.toolbarSpace} />
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainContentHolder);
