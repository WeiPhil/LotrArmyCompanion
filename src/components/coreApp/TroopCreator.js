import {
  AppBar,
  Badge,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  DialogTitle,
  TextField,
  Collapse,
  IconButton,
  Tooltip,
  Avatar,
  Popover,
  Icon
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router";
import SwipeableViews from "react-swipeable-views";
// import { Link } from "react-router-dom";
import { TUMBNAIL_CARD_SIZE, LIEUTENANT, SERGEANT } from "../../utils/Constants";
import { prettify, getCharacteristicsValue } from "../../utils/Functions";
import CompanyCard from "./CompanyCard";
import UtilsBar from "./UtilsBar";
import UnitCharacteristics from "./UnitCharacteristics";

import { getCompanyFactions, addCompanyUnit, deleteCompanyUnit, buyEquipement, postStatusReset } from "../../redux/actions/databaseAccess";
import { loadingScreenOn, loadingScreenOff } from "../../redux/actions/ui";

import HorizontalScroll from "react-scroll-horizontal";
import { GoldSackIcon } from "../icons/OverviewIcons";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import SpecialRuleCard from "./wiki/SpecialRuleCard";
import { SergeantIcon, LieutenantIcon } from "../icons/CardIcons";
import { WargearIcon } from "../icons/CardIcons";

const styles = theme => ({
  choosePaper: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    margin: "0 auto",
    // backgroundColor: "#EEEEEE"
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  companyTitleHeader: {
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.text.secondary
  },

  contentWrapper: {
    // Undo parent's padding
    [theme.breakpoints.up("sm")]: {
      margin: -theme.spacing.unit * 3
    },
    [theme.breakpoints.down("sm")]: {
      margin: -theme.spacing.unit
    }
  },
  unitTitleMinimal: {
    margin: theme.spacing.unit * 0.5,
    textAlign: "center",
    fontSize: 12,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  },
  pointsMinimal: {
    fontSize: "8px"
  },
  statusAvatarMinimal: {
    boxShadow: "0px 3px 10px rgba(0,0,0,.6)",
    height: 18,
    fontSize: 10,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.paper : theme.palette.primary.light
  },
  mediaDesktop: {
    minWidth: TUMBNAIL_CARD_SIZE * 1.5,
    width: "100%",
    height: TUMBNAIL_CARD_SIZE
  },
  mediaMobile: {
    minWidth: TUMBNAIL_CARD_SIZE,
    width: "100%",
    height: TUMBNAIL_CARD_SIZE * 0.7
  },
  tabMargin: {
    padding: theme.spacing.unit * 2
  },
  unitPointsBadge: {
    right: theme.spacing.unit * 0.5
  },
  deleteBadge: {
    left: -theme.spacing.unit
  },
  companyUnitImage: {
    width: TUMBNAIL_CARD_SIZE * 2.5,
    height: TUMBNAIL_CARD_SIZE * 2.5,
    margin: theme.spacing.unit * 2
  },
  goldAvatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark
  },
  chipRoot: {
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    textTransform: "capitalize",
    margin: theme.spacing.unit * 0.5,
    fontSize: 10
  },
  companyUnitTitle: {
    color: theme.palette.type === "dark" ? theme.palette.default : theme.palette.grey["600"]
  },
  rankIcons: {
    padding: theme.spacing.unit * 0.8,
    marginRight: theme.spacing.unit,
    cursor: "initial"
  },
  deleteIcon: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.paper : theme.palette.primary.light,
    padding: theme.spacing.unit * 0.8
  },
  equipementPaper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 4
  }
});

function TabContainer(props) {
  return <div style={props.style}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = ({ ui, data, databaseAccess }) => ({
  loadingScreen: ui.loadingScreen,
  armies: data.armies,
  companies: data.companies,
  companyFactions: data.companyFactions,
  activeCompanyUnit: data.activeCompanyUnit,
  specialRules: data.specialRules,
  equipements: data.equipements,
  companyFactionsNeedRefetch: data.companyFactionsNeedRefetch,
  postingToDatabase: databaseAccess.postingToDatabase,
  postingSuccess: databaseAccess.postingSuccess,
  postResponse: databaseAccess.postResponse
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TroopCreator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tabDisabled: [false, true],
      selectedCompanyName: null,
      selectedRank: "warrior",
      rankButtonStyle: [undefined, undefined, { backgroundColor: "rgb(255,255,255,0.1)" }],
      selectedEquipement: [],
      tabValue: 0,
      company: null,
      reinforcementUnits: [],
      army: {},
      companyUnitName: "",
      companyUnitAddEquipement: [],
      openDialogName: false,
      waitDialogName: false,
      baseUnit: null,
      activeCompanyUnit: null,
      fromCompanyUnit: false,
      showCompanyUnits: false,
      anchorEl: null,
      openedPopoverId: null,
      deleteUnitDialogOpen: false,
      equipementBuy: { open: false, name: "", value: 0 }
    };
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  handlePopoverOpen(event, popoverId) {
    this.setState({
      openedPopoverId: popoverId,
      anchorEl: event.target
    });
  }
  handlePopoverClose() {
    this.setState({
      openedPopoverId: null,
      anchorEl: null
    });
  }

  componentDidMount() {
    if (this.props.location.state !== undefined && this.props.location.state.editCompanyUnit === true) {
      const companyUnit = this.props.location.state.companyUnit;
      this.setState({ selectedCompanyName: companyUnit.company_name });
      this.setState({ activeCompanyUnit: companyUnit });
      this.setState({ tabDisabled: [false, false] });

      const companyIndex = this.props.companies.findIndex(company => company.name === companyUnit.company_name);
      this.setState({ company: this.props.companies[companyIndex] });
      this.setState({ tabDisabled: [false, false] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCompanyName !== prevState.selectedCompanyName) {
      const index = this.props.companies.findIndex(company => company.name === this.state.selectedCompanyName);
      // console.log(this.props.companies);
      this.setState({ company: this.props.companies[index] });
      const companyFactionName = this.props.companies[index]["company_faction_name"];

      const reinforcements = this.props.companyFactions[companyFactionName].reinforcements;
      // Find the corresponding units in the armies
      const reinforcementUnits = [];
      for (var reinforcement in reinforcements) {
        reinforcementUnits.push(this.props.armies[reinforcements[reinforcement].faction_name][reinforcement]);
      }

      this.setState({ reinforcementUnits: reinforcementUnits });
    }
    if (this.props.loadingScreen === true && this.props.postResponse === "You have successfully added a new company unit!") {
      this.props.loadingScreenOff();
      // this.setState({ waitDialogName: false });
      this.setState({ openDialogName: false });

      const index = this.props.companies.findIndex(company => company.name === this.state.selectedCompanyName);
      this.setState({ company: this.props.companies[index] });

      this.setState({ activeCompanyUnit: this.props.companies[index].company_units[this.state.companyUnitName] });
      this.setState({ tabDisabled: [false, false] });
      this.props.postStatusReset();
    }
    if (this.props.loadingScreen === true && this.props.postResponse === "You have successfully deleted a company unit!") {
      this.props.loadingScreenOff();

      const index = this.props.companies.findIndex(company => company.name === this.state.selectedCompanyName);
      this.setState({ company: this.props.companies[index] });
      this.setState({ deleteUnitDialogOpen: false });
      this.setState({ activeCompanyUnit: null });
      this.setState({ tabDisabled: [false, true] });
      this.props.postStatusReset();
    }
    if (this.props.loadingScreen === true && this.props.postResponse === "You have successfully added an equipement!") {
      this.props.loadingScreenOff();
      this.setState({ equipementBuy: { open: false, name: "", value: 0 } });

      const index = this.props.companies.findIndex(company => company.name === this.state.selectedCompanyName);
      this.setState({ company: this.props.companies[index] });
      this.setState({ activeCompanyUnit: this.props.companies[index].company_units[this.state.activeCompanyUnit.company_unit_name] });

      this.props.postStatusReset();
    }
  }

  onSelection = company_name => {
    this.setState({ selectedCompanyName: company_name });

    this.setState({ selectedCompanyName: company_name });
  };

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleTabChangeIndex = index => {
    this.setState({ tabValue: index });
  };

  handleNameDialogClose = () => {
    this.setState({ baseUnit: null });
    this.setState({ companyUnitName: "" });
    this.setState({ openDialogName: false });
    this.props.postStatusReset();
  };

  handleNameDialogConfirm = () => {
    const newUnitData = {
      companyName: this.state.selectedCompanyName,
      unitName: this.state.baseUnit.name,
      unitRank: this.state.selectedRank,
      companyUnitName: this.state.companyUnitName,
      additionalEquipement: [],
      image_path: this.state.baseUnit.image_path
    };
    this.props.addCompanyUnit(newUnitData);
    this.props.loadingScreenOn();
    this.setState({ openDialogName: false });
  };

  handleRankClick = rank => {
    if (rank === "warrior") {
      this.setState({ selectedRank: "warrior" });
      this.setState({ rankButtonStyle: [undefined, undefined, { backgroundColor: "rgb(255,255,255,0.1)" }] });
    } else if (rank === "lieutenant") {
      this.setState({ selectedRank: "lieutenant" });
      this.setState({ rankButtonStyle: [{ backgroundColor: "rgb(255,255,255,0.1)" }, undefined, undefined] });
    } else if (rank === "sergeant") {
      this.setState({ selectedRank: "sergeant" });
      this.setState({ rankButtonStyle: [undefined, { backgroundColor: "rgb(255,255,255,0.1)" }, undefined] });
    }
  };

  handleUnitClick = index => {
    this.setState({ baseUnit: this.state.reinforcementUnits[index] });
    this.setState({ openDialogName: true });
  };

  handleCompanyUnitChange = companyUnit => {
    this.setState({ activeCompanyUnit: companyUnit });
    this.setState({ tabDisabled: [false, false] });
  };

  deleteFromCompany = unit => {
    const companyUnitData = {};
    companyUnitData["companyUnitName"] = unit.company_unit_name;
    companyUnitData["companyName"] = unit.company_name;
    this.props.deleteCompanyUnit(companyUnitData);
    this.props.loadingScreenOn();
  };

  handleEquipementDelete = equipementName => {
    console.log("Delete" + equipementName);
  };

  handleEquipementBuy = (equipementName, goldValue) => {
    this.setState({ equipementBuy: { open: true, name: equipementName, value: goldValue } });
  };

  buyNewEquipement = ({ name, value }) => {
    const equipementData = {};
    equipementData["companyUnitName"] = this.state.activeCompanyUnit.company_unit_name;
    equipementData["equipementName"] = name;
    equipementData["equipementValue"] = value;
    this.props.buyEquipement(equipementData);
    this.props.loadingScreenOn();
  };

  render() {
    const { companies, classes, theme } = this.props;
    const { company, selectedCompanyName, reinforcementUnits, openDialogName, activeCompanyUnit, tabDisabled, anchorEl } = this.state;

    const highCostEquipement =
      activeCompanyUnit !== null && getCharacteristicsValue(activeCompanyUnit, "attacks") + getCharacteristicsValue(activeCompanyUnit, "wounds") >= 3;
    const chooseCompany = (
      <>
        <Paper elevation={1} className={classes.choosePaper}>
          <Typography className={classes.chooseTitle} align="center" variant="h4">
            Choose a Company
          </Typography>
        </Paper>
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="column" spacing={16} justify="center" alignItems="stretch">
            {companies.map((company, index) => (
              <Grid item key={index}>
                <CompanyCard forSelection onSelection={this.onSelection} company={company} />
              </Grid>
            ))}
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" justify="center" alignItems="stretch" spacing={24}>
            {companies.map((company, index) => (
              <Grid item key={index}>
                <CompanyCard forSelection onSelection={this.onSelection} company={company} />
              </Grid>
            ))}
          </Grid>
        </MediaQuery>
      </>
    );

    const companyUnitsPanel = company_units => (
      <>
        <Collapse in={this.state.showCompanyUnits}>
          {/* Mobile */}
          <MediaQuery query="(max-width: 960px)">
            <div
              style={{
                width: window.innerWidth,
                height: TUMBNAIL_CARD_SIZE * 1.3,
                overflowX: "auto",
                overflowY: "hidden",
                whiteSpace: "nowrap",
                marginBottom: 3
              }}
            >
              {Object.keys(company_units).map((company_unit_name, index) => (
                <div key={index} style={{ display: "inline-block", margin: this.props.theme.spacing.unit * 3, marginRight: this.props.theme.spacing.unit }}>
                  {minimalUnitCard(
                    company_units[company_unit_name],
                    company_units[company_unit_name].company_unit_name,
                    company_units[company_unit_name].effective_points + "Pts",
                    () => this.handleCompanyUnitChange(company_units[company_unit_name]),
                    true,
                    false
                  )}
                </div>
              ))}
            </div>
          </MediaQuery>
          {/* Desktop */}
          <MediaQuery query="(min-width: 960px)">
            <div style={{ height: TUMBNAIL_CARD_SIZE * 1.7 }}>
              <HorizontalScroll>
                {Object.keys(company_units).map((company_unit_name, index) => (
                  <div key={index} style={{ float: "left", margin: this.props.theme.spacing.unit * 3, marginRight: this.props.theme.spacing.unit }}>
                    {minimalUnitCard(
                      company_units[company_unit_name],
                      company_units[company_unit_name].company_unit_name,
                      company_units[company_unit_name].effective_points + "Pts",
                      () => this.handleCompanyUnitChange(company_units[company_unit_name]),
                      false,
                      false
                    )}
                  </div>
                ))}
                <div style={{ width: window.innerWidth - (Object.keys(company_units).length - 1) * TUMBNAIL_CARD_SIZE * 1.7, marginRight: 10 }} />
              </HorizontalScroll>
            </div>
          </MediaQuery>
        </Collapse>
      </>
    );

    const companyHeader = (
      <Typography variant="h6" className={classes.companyTitleHeader}>
        {selectedCompanyName}
      </Typography>
    );

    const minimalUnitCard = (unit, name, floatValue, onClick, mobile, forBuying) => {
      const floatingValue = label => (
        <Typography className={classes.pointsMinimal} variant="subtitle2">
          <Chip className={classes.statusAvatarMinimal} label={label} />
        </Typography>
      );

      const unitName = unit_name => (
        <Typography noWrap className={classes.unitTitleMinimal} variant="body2">
          {prettify(unit_name)}
        </Typography>
      );

      return (
        <>
          {forBuying ? (
            <Badge classes={{ badge: classes.unitPointsBadge }} badgeContent={floatingValue(floatValue)}>
              <Card>
                <CardActionArea onClick={onClick}>
                  <CardMedia className={mobile ? classes.mediaMobile : classes.mediaDesktop} image={require("./../../assets/images/" + unit.image_path)} />
                  {unitName(name)}
                </CardActionArea>
              </Card>
            </Badge>
          ) : (
            <>
              <Badge classes={{ badge: classes.unitPointsBadge }} badgeContent={floatingValue(floatValue)}>
                <Badge
                  classes={{ badge: classes.deleteBadge }}
                  badgeContent={
                    <IconButton onClick={() => this.setState({ deleteUnitDialogOpen: true })} classes={{ root: classes.deleteIcon }}>
                      <Icon fontSize="small" style={{ color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper }}>
                        delete
                      </Icon>
                    </IconButton>
                  }
                >
                  <Card>
                    <CardActionArea onClick={onClick}>
                      <CardMedia className={mobile ? classes.mediaMobile : classes.mediaDesktop} image={require("./../../assets/images/" + unit.image_path)} />
                      {unitName(name)}
                    </CardActionArea>
                  </Card>
                </Badge>
              </Badge>
              <Dialog open={this.state.deleteUnitDialogOpen} onClose={() => this.setState({ deleteUnitDialogOpen: false })}>
                <DialogTitle>{"Delete Company Unit"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>Are you sure you want to delete this company unit?</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={() => this.setState({ deleteUnitDialogOpen: false })} color="primary">
                    No
                  </Button>
                  <Button onClick={() => this.deleteFromCompany(unit)} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </>
      );
    };

    const chooseNameRankDialog = (
      <Dialog
        open={openDialogName}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleNameDialogClose}
        aria-labelledby="companyNameChoose-title"
        aria-describedby="companyNameChoose-description"
      >
        <DialogTitle id="companyNameChoose">{"Company Unit Name"}</DialogTitle>

        <DialogContent>
          <DialogContentText align="center" style={{ marginBottom: theme.spacing.unit * 2 }}>
            Choose the rank of your unit
          </DialogContentText>
          <Grid container direction="row" justify="space-around">
            <Grid item>
              <Tooltip title="Lieutenant" placement="top">
                <Button onClick={() => this.handleRankClick("lieutenant")} style={this.state.rankButtonStyle[0]}>
                  <LieutenantIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Sergeant" placement="top">
                <Button onClick={() => this.handleRankClick("sergeant")} style={this.state.rankButtonStyle[1]}>
                  <SergeantIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Warrior" placement="top">
                <Button onClick={() => this.handleRankClick("warrior")} style={this.state.rankButtonStyle[2]}>
                  <WargearIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <DialogContentText style={{ marginTop: theme.spacing.unit * 3 }} id="companyNameChoose-description">
            Choose a name for your new company unit
          </DialogContentText>
          <TextField onChange={event => this.setState({ companyUnitName: event.target.value })} autoFocus margin="dense" id="name" label="Name" />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.handleNameDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );

    const unitResumeCard = mobile => (
      <Card className={classes.unitResumeCard}>
        <CardContent>
          <Grid container direction="column" justify="space-evenly">
            <Grid item>
              <Grid container direction="row" justify="space-around" alignItems="center">
                <Grid item>
                  <Typography className={classes.companyUnitTitle} variant="h5">
                    {activeCompanyUnit.company_unit_rank === LIEUTENANT && (
                      <Tooltip placement="top" title="Lieutenant">
                        <span>
                          <IconButton className={classes.rankIcons}>
                            <LieutenantIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    {activeCompanyUnit.company_unit_rank === SERGEANT && (
                      <Tooltip placement="top" title="Sergeant">
                        <span>
                          <IconButton className={classes.rankIcons}>
                            <SergeantIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    {activeCompanyUnit.company_unit_rank !== LIEUTENANT && activeCompanyUnit.company_unit_rank !== SERGEANT && (
                      <Tooltip placement="top" title="Warrior">
                        <span>
                          <IconButton className={classes.rankIcons}>
                            <WargearIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    {prettify(activeCompanyUnit.company_unit_name)}
                  </Typography>

                  <UnitCharacteristics companyUnit={activeCompanyUnit} />
                  {/* wargear */}
                  <Typography color="textPrimary" variant="button">
                    Wargear
                  </Typography>
                  <div className={classes.chipRoot}>
                    {/* Basic wargear */}
                    {activeCompanyUnit.wargear
                      .filter(equipement => equipement.points === 0)
                      .map((equipement, index) => (
                        <Chip variant="outlined" key={index} label={prettify(equipement.name)} className={classes.chip} />
                      ))}
                    {/* Optional wargear */}
                    {activeCompanyUnit.wargear
                      .filter(equipement => equipement.points > 0 && equipement.bought === "yes")
                      .map((equipement, index) => (
                        <Chip variant={"default"} clickable key={index} label={prettify(equipement.name)} className={classes.chip} />
                      ))}
                  </div>

                  {/* special rules */}
                  {activeCompanyUnit.special_rules.length !== 0 && (
                    <>
                      <Typography color="textPrimary" variant="button">
                        Special Rules
                      </Typography>
                      <div className={classes.chipRoot}>
                        {/* Basic Special Rules */}
                        {activeCompanyUnit.special_rules
                          .filter(special_rule => special_rule.origin === "basic")
                          .map((special_rule, index) => (
                            <div key={index}>
                              <Chip
                                aria-owns={
                                  this.state.openedPopoverId === special_rule.name.concat(activeCompanyUnit.name)
                                    ? special_rule.name.concat(activeCompanyUnit.name)
                                    : undefined
                                }
                                clickable
                                onClick={e => this.handlePopoverOpen(e, special_rule.name.concat(activeCompanyUnit.name))}
                                variant="outlined"
                                label={prettify(special_rule.name)}
                                className={classes.chip}
                              />
                              <Popover
                                id={special_rule.name.concat(activeCompanyUnit.name)}
                                open={this.state.openedPopoverId === special_rule.name.concat(activeCompanyUnit.name)}
                                anchorEl={anchorEl}
                                onClose={this.handlePopoverClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center"
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center"
                                }}
                              >
                                <SpecialRuleCard specialRule={this.props.specialRules[special_rule.name]} mobile={mobile} />
                              </Popover>
                            </div>
                          ))}
                        {/* Optional wargear */}
                        {activeCompanyUnit.special_rules
                          .filter(special_rule => special_rule.origin !== "basic")
                          .map((special_rule, index) => (
                            <Chip variant={"default"} clickable key={index} label={prettify(special_rule.name)} className={classes.chip} />
                          ))}
                      </div>
                    </>
                  )}

                  <Typography color="textPrimary" variant="button">
                    Notes
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {activeCompanyUnit.notes === null ? "No notes for now" : activeCompanyUnit.notes}
                  </Typography>
                </Grid>
                <Grid item>
                  <Paper elevation={0} style={{ overflow: "hidden" }} className={classes.companyUnitImage}>
                    <img alt="" style={{ width: "100%", height: "auto" }} src={require("./../../assets/images/" + activeCompanyUnit.image_path)} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );

    const showUnits = (
      <>
        {this.state.company !== null && (
          <Chip
            avatar={
              <Avatar className={classes.goldAvatar}>
                <GoldSackIcon />
              </Avatar>
            }
            label={this.state.company.gold + " Gold"}
          />
        )}
        <Tooltip placement="bottom" title={this.state.showCompanyUnits ? "Hide Company Units" : "Show Company Units"}>
          <IconButton
            style={{ marginLeft: this.props.theme.spacing.unit, padding: this.props.theme.spacing.unit * 1.5 }}
            onClick={() => this.setState({ showCompanyUnits: !this.state.showCompanyUnits })}
          >
            {this.state.showCompanyUnits ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Tooltip>
      </>
    );

    const chooseAdditionalEquipement = () => {
      return (
        <>
          <Paper className={classes.equipementPaper}>
            <Typography variant="h6">{prettify(this.state.activeCompanyUnit.company_unit_name)}'s Wargear</Typography>
            <div className={classes.chipRoot}>
              {/* Basic wargear */}
              {this.state.activeCompanyUnit.wargear
                .filter(equipement => equipement.points === 0)
                .map((equipement, index) => (
                  <Chip variant="outlined" key={index} label={prettify(equipement.name)} className={classes.chip} />
                ))}
              {/* Optional wargear */}
              {this.state.activeCompanyUnit.wargear
                .filter(equipement => equipement.points > 0 && equipement.bought === "yes")
                .map((equipement, index) => (
                  <Chip
                    variant="default"
                    key={index}
                    label={prettify(equipement.name)}
                    className={classes.chip}
                    onDelete={() => this.handleEquipementDelete(equipement.name)}
                  />
                ))}
            </div>
            <Typography variant="h6" style={{ marginBottom: theme.spacing.unit * 2 }}>
              Additional wargear
            </Typography>
            {this.state.activeCompanyUnit.wargear
              .filter(equipement => equipement.points > 0 && equipement.bought === "no")
              .map((equipement, index) => {
                const goldValue = highCostEquipement ? this.props.equipements[equipement.name].high_cost : this.props.equipements[equipement.name].low_cost;

                return (
                  <Tooltip key={index} title={`Buy for ${goldValue} Gold`} placement="top">
                    <Chip
                      clickable
                      onClick={() => this.handleEquipementBuy(equipement.name, goldValue)}
                      variant="outlined"
                      label={
                        <>
                          <GoldSackIcon fontSize="small" /> &nbsp;&nbsp; {prettify(equipement.name)}
                        </>
                      }
                      className={classes.chip}
                    />
                  </Tooltip>
                );
              })}
          </Paper>
          <Dialog open={this.state.equipementBuy.open} onClose={() => this.setState({ equipementBuy: { open: false, name: "", value: 0 } })}>
            <DialogTitle>{"Delete Company Unit"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to buy the item <b>{prettify(this.state.equipementBuy.name)}</b> for {this.state.equipementBuy.value} Gold?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => this.setState({ equipementBuy: { open: false, name: "", value: 0 } })} color="primary">
                No
              </Button>
              <Button onClick={() => this.buyNewEquipement(this.state.equipementBuy)} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    };

    return (
      <>
        {selectedCompanyName === null ? (
          chooseCompany
        ) : (
          <div className={classes.contentWrapper}>
            <UtilsBar leftContent={companyHeader} rightContent={showUnits} />
            {company !== null && companyUnitsPanel(company.company_units)}
            <AppBar position="static" color="default">
              <Tabs fullWidth value={this.state.tabValue} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab disabled={tabDisabled[0]} label="Unit Resume" />
                <Tab disabled={tabDisabled[1]} label="Buy Additional Equipement" />
              </Tabs>
            </AppBar>
            {!this.props.loadingScreen && chooseNameRankDialog}
            <SwipeableViews index={this.state.tabValue} onChangeIndex={this.handleTabChangeIndex}>
              <TabContainer style={{ padding: theme.spacing.unit * 2 }}>
                <Grid className={classes.tabMargin} container direction="row" justify="center" spacing={16}>
                  {activeCompanyUnit === null &&
                    reinforcementUnits.map((unit, index) => (
                      <Grid item key={index}>
                        {/* Mobile */}
                        <MediaQuery query="(max-width: 960px)">
                          {minimalUnitCard(unit, unit.name, unit.points + " Gold", () => this.handleUnitClick(index), true, true)}
                        </MediaQuery>
                        {/* Desktop */}
                        <MediaQuery query="(min-width: 960px)">
                          {minimalUnitCard(unit, unit.name, unit.points + " Gold", () => this.handleUnitClick(index), false, true)}
                        </MediaQuery>
                      </Grid>
                    ))}
                </Grid>
                {activeCompanyUnit !== null && !this.props.loadingScreen && (
                  <>
                    {/* Mobile */}
                    <MediaQuery query="(max-width: 960px)">{unitResumeCard(true)}</MediaQuery>
                    {/* Desktop */}
                    <MediaQuery query="(min-width: 960px)">{unitResumeCard(false)}</MediaQuery>
                  </>
                )}
              </TabContainer>
              <TabContainer>{activeCompanyUnit !== null && chooseAdditionalEquipement()}</TabContainer>
            </SwipeableViews>
          </div>
        )}
      </>
    );
  }
}

TroopCreator.propTypes = {
  classes: PropTypes.object
};

export default withRouter(
  connect(
    mapStateToProps,
    { getCompanyFactions, addCompanyUnit, deleteCompanyUnit, buyEquipement, postStatusReset, loadingScreenOn, loadingScreenOff }
  )(withStyles(styles, { withTheme: true })(TroopCreator))
);
