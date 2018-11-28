import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import { setMenuState } from "./../redux/actions";

import { WIKI, MENU_WIDTH } from "./../utils/Constants";
import { RallyTheTroops, Scroll, SwordShield, TwoCoins } from "./coreApp/CustomIcons";

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
  toolbar: theme.mixins.toolbar,
  menuItemeSelected: {
    background: theme.palette.type === "dark" ? theme.palette.background.default : "#ebebeb"
  }
});

const mapStateToProps = ({ menuState }) => ({ menuState });

// const mapDispatchToProps = dispatch => {
//   return {
//     setMenuState: index => dispatch(setMenuState(index))
//   };
// };

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, menuState } = this.props;

    const iconColor = theme.palette.type === "dark" ? "#ccccc" : theme.palette.secondary.main;

    const menuItems = [
      ["Company Information", <SwordShield fontSize="large" nativeColor={iconColor} />],
      ["Army Overview", <RallyTheTroops fontSize="large" nativeColor={iconColor} />],
      ["Buy troops", <TwoCoins fontSize="large" nativeColor={iconColor} />]
    ];

    const drawer = (
      <div>
        <div style={{ marginTop: theme.spacing.unit * 4 }} />

        <List>
          {menuItems.slice(0, 3).map((pair, index) => (
            <ListItem
              className={classnames({
                [classes.menuItemeSelected]: menuState === index
              })}
              onClick={() => this.props.setMenuState(index)}
              button
              key={index}
            >
              <ListItemIcon>{pair[1]}</ListItemIcon>
              <ListItemText primary={pair[0]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[["Wiki", <Scroll fontSize="large" nativeColor={iconColor} />]].map(pair => (
            <ListItem
              className={classnames({
                [classes.menuItemeSelected]: menuState === WIKI
              })}
              onClick={() => this.props.setMenuState(WIKI)}
              button
              key={WIKI}
            >
              <ListItemIcon>{pair[1]}</ListItemIcon>
              <ListItemText primary={pair[0]} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.menuButton}>
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
        {this.props.children}
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

export default connect(
  mapStateToProps,
  { setMenuState }
)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
