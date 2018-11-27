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
    const { classes, menuState } = this.props;

    return (
      <div className={classes.contentHolder}>
        <div className={classes.toolbarSpace} />
        {console.log(menuState)}
        {React.cloneElement(this.props.children, { menuState: menuState })}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainContentHolder);
