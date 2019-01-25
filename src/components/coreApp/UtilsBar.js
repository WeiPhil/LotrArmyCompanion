import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles, AppBar, Toolbar, Icon, InputBase, IconButton } from "@material-ui/core/";

import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.type === "dark" ? fade(theme.palette.common.white, 0.15) : fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? fade(theme.palette.common.white, 0.25) : fade(theme.palette.common.black, 0.15)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  customToolbar: {
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
  state = {
    searched: ""
  };

  handleSearch = event => {
    this.props.onSearch(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.toolbar} />

        <AppBar className={classes.customToolbar} color="inherit" position="fixed">
          <Toolbar>
            {/* <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Just a test
            </Typography> */}
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={this.handleSearch}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <IconButton>
              <Icon>more_vert</Icon>
            </IconButton>
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
