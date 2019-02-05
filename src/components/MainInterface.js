import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { disconnect } from "../redux/actions/auth";
import { getUserCompanies, getArmies, getCompanyFactions, getSpecialRules } from "../redux/actions/databaseAccess";
import { setTheme } from "./../redux/actions/ui";
import { getCommunityChat } from "./../redux/actions/chat";

import { unprettify } from "./../utils/Functions";
import { WIKI, MENU_WIDTH, REACTION_TIMEOUT, NEW_BATTLE } from "./../utils/Constants";
import { NewBattleIcon, LightIcon, RallyTheTroopsIcon, ScrollIcon, SpearsIcon, SwordShieldIcon, TwoCoinsIcon } from "./icons/MenuIcons";

import { withRouter, Redirect } from "react-router";

import {
  Button,
  Collapse,
  Avatar,
  Menu,
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
import CompanyCreator from "./coreApp/CompanyCreator";
import TroopCreator from "./coreApp/TroopCreator";

import { Route, Link, Switch } from "react-router-dom";
import LoginPanel from "./coreApp/LoginPanel";
import ChatAppBar from "./coreApp/chat/ChatAppBar";
import LoadingView from "./LoadingView";
import SpecialRulesOverview from "./coreApp/wiki/SpecialRulesOverview";

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
    marginBottom: 35,
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
  },
  avatar: {
    color: "#fff",
    backgroundColor: "#00838F"
  },
  avatarButton: {
    padding: theme.spacing.unit * 0.5
  }
});

const mapStateToProps = ({ ui, data, databaseAccess, auth, chat }) => ({
  themeType: ui.themeType,
  loadingScreen: ui.loadingScreen,
  companies: data.companies,
  armies: data.armies,
  hasNoCompanies: data.hasNoCompanies,
  companiesNeedRefetch: databaseAccess.companiesNeedRefetch,
  isLoadingCompanies: databaseAccess.isLoadingCompanies,
  armiesNeedRefetch: databaseAccess.armiesNeedRefetch,
  isLoadingArmies: databaseAccess.isLoadingArmies,
  isLoadingCompanyFactions: databaseAccess.isLoadingCompanyFactions,
  companyFactionsNeedRefetch: databaseAccess.companyFactionsNeedRefetch,
  isLoadingSpecialRules: databaseAccess.isLoadingSpecialRules,
  specialRulesNeedRefetch: databaseAccess.specialRulesNeedRefetch,
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
    loginOpen: false,
    isHovered: false,
    anchorEl: null
  };

  componentDidMount() {
    console.log("Main Interface loading");
    if (this.props.loggedIn) this.props.getUserCompanies(this.props.username, this.props.accessToken);
    if (this.props.armiesNeedRefetch) this.props.getArmies();
    if (this.props.companyFactionsNeedRefetch) this.props.getCompanyFactions();
    if (this.props.specialRulesNeedRefetch) this.props.getSpecialRules();

    if (this.props.socketConnected) this.props.getCommunityChat();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.armiesNeedRefetch !== this.props.armiesNeedRefetch && this.props.armiesNeedRefetch === true) this.props.getArmies();

    // In case we are loggedin and we need to refetch the companies
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
      this.props.isLoadingCompanies || this.props.companiesNeedRefetch || this.props.hasNoCompanies || !this.props.loggedIn
        ? []
        : this.props.companies.map((company, idx) => [company.name, "/companiesOverview/" + unprettify(company.name)]);

    var menuItems = [
      ["New Battle", <NewBattleIcon fontSize="large" nativeColor={iconColor} />, "/battle", []],
      ["My Companies", <SwordShieldIcon fontSize="large" nativeColor={iconColor} />, "/myCompanies", []],
      ["Companies Overview", <RallyTheTroopsIcon fontSize="large" nativeColor={iconColor} />, "/companiesOverview", companyNames],
      ["Buy troops", <TwoCoinsIcon fontSize="large" nativeColor={iconColor} />, "/troopCreator", []],
      ["Wiki", <ScrollIcon fontSize="large" nativeColor={iconColor} />, "/wiki", []]
    ];
    if (!this.props.loggedIn) {
      delete menuItems[1];
    }

    if (!this.props.loggedIn || this.props.hasNoCompanies) {
      delete menuItems[0];
      delete menuItems[2];
      delete menuItems[3];
    }

    return menuItems;
  };

  handleLoginClose = () => {
    this.setState(state => ({ loginOpen: !state.loginOpen }));
  };

  handleAvatarClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAvatarClose = () => {
    this.setState({ anchorEl: null });
  };
  handleDisconnect = () => {
    this.setState({ anchorEl: null });
    this.props.disconnect();
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
      isLoadingCompanyFactions,
      isLoadingSpecialRules,
      companyFactionsNeedRefetch,
      specialRulesNeedRefetch,
      armiesNeedRefetch,
      loggedIn,
      hasNoCompanies,
      username,
      loadingScreen
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
    const loadingContent = isLoadingArmies || isLoadingCompanies || isLoadingCompanyFactions || isLoadingSpecialRules;
    const loadingStyle = loadingContent || loadingScreen ? { opacity: 0.2 } : undefined;
    return (
      <>
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar} style={loadingStyle}>
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
                <>
                  <IconButton onClick={this.handleAvatarClick} className={classes.avatarButton}>
                    <Avatar alt="User Avatar" src={require("../assets/images/baseAvatar.jpg")} className={classes.avatar} />
                  </IconButton>
                  <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleAvatarClose}>
                    <MenuItem disabled>
                      Signed in as &nbsp;<b>{username}</b>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleAvatarClose}>Settings</MenuItem>
                    <MenuItem onClick={this.handleAvatarClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleDisconnect}>Disconnect</MenuItem>
                  </Menu>
                </>
              )}
              <LoginPanel handleLoginClose={this.handleLoginClose} loginOpen={this.state.loginOpen} />
              {/* Avatar and user options  */}
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} style={loadingStyle}>
            <Hidden smUp implementation="css">
              <Drawer
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
          <main className={classes.content} style={loadingStyle}>
            <div className={classes.toolbar} />
            <Switch>
              {loggedIn &&
                !loadingContent &&
                !armiesNeedRefetch &&
                !companiesNeedRefetch &&
                !hasNoCompanies && [
                  companies.map((company, idx) => (
                    <Route key={idx} path={"/companiesOverview/" + unprettify(company.name)} render={() => <CompanyUnitsOverview company={company} />} />
                  )),
                  <Route exact key={"troop-creator"} path="/troopCreator" component={TroopCreator} />
                ]}
              {loggedIn && (
                <Route key={companies.length} path="/myCompanies" render={() => <MyCompanies companies={companies} hasNoCompanies={hasNoCompanies} />} />
              )}
              {!loadingContent && <Route exact path="/" component={Welcome} />}
              <Route exact path="/wiki" component={Wiki} />
              {!isLoadingArmies && !armiesNeedRefetch && <Route exact path="/wiki/armies" render={() => <WikiArmies armies={armies} />} />}
              {!isLoadingSpecialRules && !specialRulesNeedRefetch && <Route exact path="/wiki/special_rules" render={() => <SpecialRulesOverview />} />}
              {!isLoadingArmies &&
                !armiesNeedRefetch && [
                  Object.keys(armies).map((armyName, index) => (
                    <Route key={index} path={"/wiki/armies/" + armyName} render={() => <ArmyOverview units={armies[armyName]} />} />
                  ))
                ]}
              {loggedIn && !companyFactionsNeedRefetch && !isLoadingCompanyFactions && <Route exact path="/companyCreator" component={CompanyCreator} />}
              <Route path="/register" component={Register} />
              {/* From here if we are not logged in we get automatically rerouted */}
              {!loadingContent && <Route render={() => <Redirect to="/" />} />}
            </Switch>

            <ChatAppBar />
          </main>
        </div>
        {((loggedIn && loadingContent) || loadingScreen) && <LoadingView />}
      </>
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
    { setTheme, getUserCompanies, getArmies, getCompanyFactions, getSpecialRules, disconnect, getCommunityChat }
  )(withStyles(styles, { withTheme: true })(MainInterface))
);
