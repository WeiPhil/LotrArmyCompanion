import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { setTheme } from "./../redux/actions";

import { WIKI, MENU_WIDTH, REACTION_TIMEOUT } from "./../utils/Constants";
import { LightIcon, RallyTheTroopsIcon, ScrollIcon, SwordShieldIcon, TwoCoinsIcon } from "./icons/MenuIcons";

import { withRouter } from "react-router";

import { MenuList, MenuItem, AppBar, Divider, Drawer, Hidden, IconButton, List, ListItemIcon, ListItemText } from "@material-ui/core";

import ArmyOverview from "./coreApp/ArmyOverview";
import MyCompanies from "./coreApp/MyCompanies";
import Wiki from "./coreApp/Wiki";

import { Route, Link } from "react-router-dom";

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
    flexGrow: 1,
    marginLeft: MENU_WIDTH,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${MENU_WIDTH}px)`
    }
  },
  menuButton: {
    flexGrow: 1,
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawerPaper: {
    width: MENU_WIDTH
  },
  menuTitle: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit * 3
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit
    }
  },
  toolbar: theme.mixins.toolbar,
  menuItem: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2.5,
    "&:focus": {
      backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : "#ebebeb"
    }
  }
});

const mapStateToProps = ({ themeType }) => ({ themeType });

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleMenuClick = () => {
    if (this.state.mobileOpen) setTimeout(() => this.handleDrawerToggle(), REACTION_TIMEOUT);
  };

  render() {
    const { classes, theme, setTheme, themeType } = this.props;
    const iconColor = theme.palette.type === "dark" ? "#ccccc" : theme.palette.secondary.main;

    const menuItems = [
      ["My Companies", <SwordShieldIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies"],
      ["Army Overview", <RallyTheTroopsIcon fontSize="large" nativeColor={iconColor} />, "/armyOverview"],
      ["Buy troops", <TwoCoinsIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies"]
    ];

    const drawer = (
      <div>
        <div style={{ marginTop: theme.spacing.unit * 4 }} />

        <MenuList>
          {menuItems.slice(0, 3).map((menuItem, index) => (
            <Link to={menuItem[2]} style={{ textDecoration: "none" }} key={index}>
              <MenuItem className={classes.menuItem} onClick={() => this.handleMenuClick(index)} button>
                <ListItemIcon>{menuItem[1]}</ListItemIcon>
                <ListItemText primary={menuItem[0]} />
              </MenuItem>
            </Link>
          ))}
        </MenuList>
        <Divider />
        <List>
          {[["Wiki", <ScrollIcon fontSize="large" nativeColor={iconColor} />, "wiki"]].map(menuItem => (
            <Link to={menuItem[2]} style={{ textDecoration: "none" }} key={WIKI}>
              <MenuItem className={classes.menuItem} onClick={() => this.handleMenuClick(WIKI)} button>
                <ListItemIcon>{menuItem[1]}</ListItemIcon>
                <ListItemText primary={menuItem[0]} />
              </MenuItem>
            </Link>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <span className={classes.menuButton}>
              <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </span>
            <Hidden xsDown>
              <Typography variant="h6" color="inherit" noWrap className={classes.menuTitle}>
                Lotr Company Creator
              </Typography>
            </Hidden>
            {themeType === "dark" ? (
              <IconButton color="inherit" onClick={() => setTheme("light")}>
                <LightIcon />
              </IconButton>
            ) : (
              <IconButton color="inherit" onClick={() => setTheme("dark")}>
                <LightIcon />
              </IconButton>
            )}

            {/* <Button color="inherit">Login</Button> */}
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
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Route exact path="/" component={MyCompanies} />
          <Route path="/myCompanies" component={MyCompanies} />
          <Route path="/armyOverview" component={ArmyOverview} />
          <Route path="/wiki" component={Wiki} />
          {/* <MainContent /> */}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { setTheme }
  )(withStyles(styles, { withTheme: true })(ResponsiveDrawer))
);
