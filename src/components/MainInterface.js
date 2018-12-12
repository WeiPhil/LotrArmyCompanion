import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { getUserCompanies, getArmies } from "../redux/actions/databaseAccess";
import { setTheme } from "./../redux/actions/ui";

import { WIKI, MENU_WIDTH, REACTION_TIMEOUT } from "./../utils/Constants";
import { LightIcon, RallyTheTroopsIcon, ScrollIcon, SpearsIcon, SwordShieldIcon, TwoCoinsIcon } from "./icons/MenuIcons";

import { withRouter } from "react-router";

import {
  Button,
  Collapse,
  MenuList,
  MenuItem,
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import CompaniesOverview from "./coreApp/CompaniesOverview";
import MyCompanies from "./coreApp/MyCompanies";
import Wiki from "./coreApp/Wiki";
import Register from "./coreApp/Register";

import { Route, Link } from "react-router-dom";
import LoginPanel from "./coreApp/LoginPanel";

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
  },
  submenuItem: {
    "&:focus": {
      backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : "#ebebeb"
    },
    paddingLeft: theme.spacing.unit * 3
  },
  submenuText: {
    paddingLeft: 0
  }
});

const mapStateToProps = ({ ui, data, databaseAccess }) => ({
  themeType: ui.themeType,
  companies: data.companies.companies,
  companiesNeedRefetch: databaseAccess.companiesNeedRefetch,
  isLoadingCompanies: databaseAccess.isLoadingCompanies
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    isOpen: [false, false, false, false],
    selectedCompanyIndex: 0,
    loginOpen: false
  };

  componentDidMount() {
    console.log("Main Interface loading");
    if (this.props.companiesNeedRefetch) this.props.getUserCompanies();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleMenuClick = (index, hasSubmenu) => {
    const openList = this.state.isOpen;
    openList[index] = !this.state.isOpen[index];
    this.setState({ isOpen: openList });
    if (this.state.mobileOpen && !hasSubmenu) setTimeout(() => this.handleDrawerToggle(), REACTION_TIMEOUT);
  };

  handleSubmenuClick = index => {
    this.setState({ selectedCompanyIndex: index });
    if (this.state.mobileOpen) setTimeout(() => this.handleDrawerToggle(), REACTION_TIMEOUT);
  };

  createMenuItems = () => {
    const iconColor = this.props.theme.palette.type === "dark" ? "#ccccc" : this.props.theme.palette.secondary.main;

    const companyNames =
      this.props.isLoadingCompanies || this.props.companiesNeedRefetch
        ? []
        : this.props.companies.map((company, idx) => [company.company_name, "/companiesOverview/" + company.company_access_name]);

    const menuItems = [
      ["My Companies", <SwordShieldIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies", []],
      ["Companies Overview", <RallyTheTroopsIcon fontSize="large" nativeColor={iconColor} />, "/companiesOverview", companyNames],
      ["Buy troops", <TwoCoinsIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies", []],
      ["Wiki", <ScrollIcon fontSize="large" nativeColor={iconColor} />, "wiki", []]
    ];
    return menuItems;
  };

  handleLoginClose = () => {
    this.setState(state => ({ loginOpen: !state.loginOpen }));
  };

  render() {
    const { classes, theme, setTheme, themeType, companies, isLoadingCompanies, companiesNeedRefetch } = this.props;

    const menuItems = this.createMenuItems();
    const hasSubmenus = menuItems.map(menuItem => menuItem[3].length > 1);
    const NAME_IDX = 0;
    const ICON_IDX = 1;
    const LINK_IDX = 2;
    const SUBMENUS_IDX = 3;

    const drawer = (
      <div>
        <div style={{ marginTop: theme.spacing.unit * 4 }} />

        <MenuList>
          {menuItems.map((menuItem, index) => (
            <span key={index}>
              {hasSubmenus[index] ? (
                <MenuItem className={classes.menuItem} onClick={() => this.handleMenuClick(index, true)} button>
                  <ListItemIcon>{menuItem[ICON_IDX]}</ListItemIcon>
                  <ListItemText primary={menuItem[NAME_IDX]} />
                  {this.state.isOpen[index] ? <ExpandLess /> : <ExpandMore />}
                </MenuItem>
              ) : (
                <Link to={menuItem[LINK_IDX]} style={{ textDecoration: "none" }}>
                  <MenuItem className={classes.menuItem} onClick={() => this.handleMenuClick(index, false)} button>
                    <ListItemIcon>{menuItem[ICON_IDX]}</ListItemIcon>
                    <ListItemText primary={menuItem[NAME_IDX]} />
                  </MenuItem>
                </Link>
              )}
              {menuItem[SUBMENUS_IDX].map((submenu, idx) => (
                <Collapse key={idx} in={this.state.isOpen[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to={submenu[1]} style={{ textDecoration: "none" }}>
                      <MenuItem button className={classes.submenuItem} onClick={() => this.handleSubmenuClick(idx)}>
                        <ListItemIcon>
                          <SpearsIcon nativeColor={theme.palette.type === "dark" ? "#ccccc" : theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText className={classes.submenuText}>
                          <Typography noWrap>{submenu[0]}</Typography>
                        </ListItemText>
                      </MenuItem>
                    </Link>
                  </List>
                </Collapse>
              ))}

              {index === WIKI - 1 && <Divider />}
            </span>
          ))}
        </MenuList>
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
            {/* Login panel */}
            <Button onClick={() => this.setState(state => ({ loginOpen: !state.loginOpen }))} color="inherit">
              Login
            </Button>
            <LoginPanel handleLoginClose={this.handleLoginClose} loginOpen={this.state.loginOpen} />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              // container={this.props.container}
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
          {!isLoadingCompanies && !companiesNeedRefetch ? (
            companies.map((company, idx) => (
              <Route
                key={idx}
                path={"/companiesOverview/" + company.company_access_name}
                render={() => <CompaniesOverview companyIndex={idx} />}
              />
            ))
          ) : (
            <Route path="/companiesOverview" render={() => <CompaniesOverview companyIndex={0} />} />
          )}
          <Route path="/wiki" component={Wiki} />

          <Route path="/register" component={Register} />
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
    { setTheme, getUserCompanies, getArmies }
  )(withStyles(styles, { withTheme: true })(ResponsiveDrawer))
);
