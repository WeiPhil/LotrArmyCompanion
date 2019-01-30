import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles, AppBar, Toolbar } from "@material-ui/core/";
import { MENU_WIDTH } from "../../utils/Constants";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },

  customToolbar: {
    paddingLeft: MENU_WIDTH,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0
    },
    zIndex: 800,
    dense: false,
    top: 56,
    "@media (min-width:0px) and (orientation: landscape)": {
      top: 48
    },
    "@media (min-width:600px)": {
      top: 64
    }
  },
  toolbar: theme.mixins.toolbar
});

class UtilsBar extends Component {
  render() {
    const { classes, leftContent, rightContent } = this.props;

    return (
      <>
        <div className={classes.toolbar} />

        <AppBar className={classes.customToolbar} color="inherit" position="fixed">
          <Toolbar>
            {leftContent}
            <div className={classes.grow} />
            {rightContent}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

UtilsBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UtilsBar);
