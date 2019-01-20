import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { disconnect } from "../redux/actions/auth";
import { getUserCompanies, getArmies } from "../redux/actions/databaseAccess";
import { setTheme } from "./../redux/actions/ui";
import { getCommunityChat } from "./../redux/actions/chat";

import { unprettify } from "./../utils/Functions";
import { WIKI, MENU_WIDTH, REACTION_TIMEOUT, NEW_BATTLE } from "./../utils/Constants";
import { NewBattleIcon, LightIcon, RallyTheTroopsIcon, ScrollIcon, SpearsIcon, SwordShieldIcon, TwoCoinsIcon } from "./icons/MenuIcons";

import { withRouter, Redirect } from "react-router";

import {
  Grid,
  CircularProgress,
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

import CompanyUnitsOverview from "./coreApp/CompanyUnitsOverview";
import MyCompanies from "./coreApp/MyCompanies";
import Wiki from "./coreApp/wiki/Wiki";
import ArmyOverview from "./coreApp/wiki/ArmyOverview";
import WikiArmies from "./coreApp/wiki/WikiArmies";
import Welcome from "./coreApp/Welcome";
import Register from "./coreApp/Register";

import { Route, Link, Switch } from "react-router-dom";
import LoginPanel from "./coreApp/LoginPanel";
import ChatAppBar from "./coreApp/chat/ChatAppBar";

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

const mapStateToProps = ({ ui, data, databaseAccess, auth, chat }) => ({
  themeType: ui.themeType,
  companies: data.companies,
  armies: data.armies,
  companiesNeedRefetch: databaseAccess.companiesNeedRefetch,
  isLoadingCompanies: databaseAccess.isLoadingCompanies,
  armiesNeedRefetch: databaseAccess.armiesNeedRefetch,
  isLoadingArmies: databaseAccess.isLoadingArmies,
  username: auth.username,
  loggedIn: auth.loggedIn,
  accessToken: auth.accessToken,
  activeChat: chat.activeChat,
  socketConnected: chat.socketConnected
});

class MainInterface extends React.Component {
  state = {
    mobileOpen: false,
    isOpen: [false, false, false, false],
    selectedCompanyIndex: 0,
    loginOpen: false
  };

  componentDidMount() {
    console.log("Main Interface loading");
    if (this.props.loggedIn && this.props.companiesNeedRefetch) this.props.getUserCompanies(this.props.username, this.props.accessToken);
    if (this.props.armiesNeedRefetch) this.props.getArmies();

    if (this.props.socketConnected) this.props.getCommunityChat();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.armiesNeedRefetch !== this.props.armiesNeedRefetch && this.props.armiesNeedRefetch === true) this.props.getArmies();

    if (prevProps.loggedIn !== this.props.loggedIn && this.props.loggedIn === true && this.props.companiesNeedRefetch === true)
      this.props.getUserCompanies(this.props.username, this.props.accessToken);

    if (this.props.loggedIn === true && prevProps.companiesNeedRefetch !== this.props.companiesNeedRefetch && this.props.companiesNeedRefetch === true)
      this.props.getUserCompanies(this.props.username, this.props.accessToken);

    if (prevProps.socketConnected !== this.props.socketConnected && this.props.socketConnected === true) this.props.getCommunityChat();
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
    const iconColor = this.props.theme.palette.type === "dark" ? "#FFFFFF" : this.props.theme.palette.secondary.main;

    const companyNames =
      this.props.isLoadingCompanies || this.props.companiesNeedRefetch
        ? []
        : this.props.companies.map((company, idx) => [company.name, "/companiesOverview/" + unprettify(company.name)]);

    var menuItems = [
      ["New Battle", <NewBattleIcon fontSize="large" nativeColor={iconColor} />, "/battle", []],
      ["My Companies", <SwordShieldIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies", []],
      ["Companies Overview", <RallyTheTroopsIcon fontSize="large" nativeColor={iconColor} />, "/companiesOverview", companyNames],
      ["Buy troops", <TwoCoinsIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies", []],
      ["Wiki", <ScrollIcon fontSize="large" nativeColor={iconColor} />, "/wiki", []]
    ];

    if (!this.props.loggedIn) {
      delete menuItems[0];
      delete menuItems[1];
      delete menuItems[2];
      delete menuItems[3];
    }
    return menuItems;
  };

  handleLoginClose = () => {
    this.setState(state => ({ loginOpen: !state.loginOpen }));
  };

  render() {
    const {
      classes,
      theme,
      setTheme,
      themeType,
      armies,
      companies,
      isLoadingCompanies,
      companiesNeedRefetch,
      isLoadingArmies,
      armiesNeedRefetch,
      loggedIn
    } = this.props;

    const menuItems = this.createMenuItems();
    const hasSubmenus = menuItems.map(menuItem => menuItem[3].length > 0);
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
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                      // avoid state update when clicking NEW_BATTLE link
                      if (index !== NEW_BATTLE) this.handleMenuClick(index, false);
                    }}
                    button
                  >
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
              {index === NEW_BATTLE && <Divider />}
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
            {/* Login/Disconnect panel */}
            {!loggedIn ? (
              <Button onClick={() => this.setState(state => ({ loginOpen: !state.loginOpen }))} color="inherit">
                Login
              </Button>
            ) : (
              <Button onClick={() => this.props.disconnect()} color="inherit">
                Disconnect
              </Button>
            )}
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

          <Switch>
            {loggedIn &&
              !isLoadingArmies &&
              !armiesNeedRefetch &&
              !isLoadingCompanies &&
              !companiesNeedRefetch && [
                companies.map((company, idx) => (
                  <Route
                    key={idx}
                    path={"/companiesOverview/" + unprettify(company.name)}
                    render={() => <CompanyUnitsOverview armies={armies} companies={companies} companyIndex={idx} />}
                  />
                )),
                <Route key={companies.length} path="/myCompanies" render={() => <MyCompanies companies={companies} />} />
              ]}
            <Route exact path="/" component={Welcome} />
            <Route exact path="/wiki" component={Wiki} />
            {!isLoadingArmies && !armiesNeedRefetch && <Route exact path="/wiki/armies" render={() => <WikiArmies armies={armies} />} />}
            {!isLoadingArmies &&
              !armiesNeedRefetch && [
                Object.keys(armies).map((armyName, index) => (
                  <Route key={index} path={"/wiki/armies/" + armyName} render={() => <ArmyOverview troops={armies[armyName]} />} />
                ))
              ]}

            <Route path="/register" component={Register} />
            {/* From here if we are not logged in we get automatically rerouted */}
            <Redirect to="/" />
          </Switch>
          {loggedIn && (isLoadingArmies || armiesNeedRefetch || isLoadingCompanies || companiesNeedRefetch) && (
            <Grid container justify="center">
              <CircularProgress color="secondary" />
            </Grid>
          )}
          <ChatAppBar />
        </main>
      </div>
    );
  }
}

MainInterface.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { setTheme, getUserCompanies, getArmies, disconnect, getCommunityChat }
  )(withStyles(styles, { withTheme: true })(MainInterface))
);
