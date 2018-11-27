import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { MENU_WIDTH } from "./../utils/Constants";

import {
  TwoCoins,
  Scroll,
  SwordShield,
  RallyTheTroops
} from "./coreApp/CustomIcons";

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: MENU_WIDTH,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: MENU_WIDTH,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${MENU_WIDTH}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawerPaper: {
    width: MENU_WIDTH
  },
  toolbar: theme.mixins.toolbar
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const mainContent = this.props.children;

    const iconColor =
      theme.palette.type === "dark" ? "#ccccc" : theme.palette.secondary.main;
    // theme.palette.primary.light
    const drawer = (
      <div>
        <div style={{ marginTop: theme.spacing.unit * 4 }} />
        {/* <Divider /> */}
        <List>
          {[
            [
              "Company Information",
              <SwordShield fontSize="large" nativeColor={iconColor} />
            ],
            [
              "Army Overview",
              <RallyTheTroops fontSize="large" nativeColor={iconColor} />
            ],
            [
              "Buy new troops",
              <TwoCoins fontSize="large" nativeColor={iconColor} />
            ]
          ].map((pair, index) => (
            <ListItem button key={pair[0]}>
              <ListItemIcon>{pair[1]}</ListItemIcon>
              <ListItemText primary={pair[0]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[["Wiki", <Scroll fontSize="large" nativeColor={iconColor} />]].map(
            (pair, index) => (
              <ListItem button key={pair[0]}>
                <ListItemIcon>{pair[1]}</ListItemIcon>
                <ListItemText primary={pair[0]} />
              </ListItem>
            )
          )}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Lotr Company Creator
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.toolbar} />
        {mainContent}
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
