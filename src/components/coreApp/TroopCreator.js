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
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router";
import SwipeableViews from "react-swipeable-views";
// import { Link } from "react-router-dom";
import { getCompanyFactions } from "../../redux/actions/databaseAccess";
import { TUMBNAIL_CARD_SIZE } from "../../utils/Constants";
import { prettify } from "../../utils/Functions";
import CompanyCard from "./CompanyCard";
import UtilsBar from "./UtilsBar";
import UnitCharacteristics from "./UnitCharacteristics";

const styles = theme => ({
  choosePaper: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    margin: "0 auto",
    // backgroundColor: "#EEEEEE"
    width: "50vw",
    [theme.breakpoints.down("sm")]: {
      width: "98vw"
    }
  },
  chooseTitle: {
    // color: theme.palette.secondary.dark
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
  companyUnitImage: {
    width: TUMBNAIL_CARD_SIZE * 2.5,
    height: TUMBNAIL_CARD_SIZE * 2.5,
    margin: theme.spacing.unit * 2
  }
});

function TabContainer(props) {
  return <div style={props.style}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = ({ data }) => ({
  armies: data.armies,
  companies: data.companies,
  companyFactions: data.companyFactions,
  companyFactionsNeedRefetch: data.companyFactionsNeedRefetch
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class TroopCreator extends Component {
  state = {
    tabDisabled: [false, true, true],
    selectedCompanyName: null,
    tabValue: 0,
    company: {},
    companyUnits: [],
    army: {},
    companyUnitName: "",
    companyUnitAddEquipement: [],
    openDialogName: false,
    newCompanyUnit: null
  };

  componentDidMount() {
    if (this.props.companyFactionsNeedRefetch) this.props.getCompanyFactions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCompanyName !== prevState.selectedCompanyName) {
      const index = this.props.companies.findIndex(company => company.name === this.state.selectedCompanyName);
      // console.log(this.props.companies);
      this.setState({ company: this.props.companies[index] });
      const companyFactionName = this.props.companies[index]["company_faction_name"];

      const reinforcements = this.props.companyFactions[companyFactionName].reinforcements;
      // Find the corresponding units in the armies
      const companyUnits = [];
      for (var reinforcement in reinforcements) {
        companyUnits.push(this.props.armies[reinforcements[reinforcement].faction_name][reinforcement]);
      }

      this.setState({ companyUnits: companyUnits });
    }
  }

  onSelection = company_name => {
    this.setState({ selectedCompanyName: company_name });
  };

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleTabChangeIndex = index => {
    this.setState({ tabValue: index });
  };

  handleNameDialogClose = () => {
    this.setState({ newCompanyUnit: null });
    this.setState({ companyUnitName: "" });
    this.setState({ openDialogName: false });
  };

  handleNameDialogConfirm = () => {
    this.setState({ openDialogName: false });
  };

  handleUnitClick = index => {
    this.setState({ newCompanyUnit: this.state.companyUnits[index] });
    this.setState({ openDialogName: true });
  };

  render() {
    const { companies, classes, theme } = this.props;
    const { company, selectedCompanyName, companyUnits, openDialogName, companyUnitName, tabDisabled } = this.state;
    console.log(companyUnits);
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

    const companyHeader = (
      <Typography variant="h6" className={classes.companyTitleHeader}>
        {selectedCompanyName}
      </Typography>
    );

    const floatingValue = points => (
      <Typography className={classes.pointsMinimal} variant="subtitle2">
        <Chip className={classes.statusAvatarMinimal} label={points + " Gold"} />
      </Typography>
    );

    const unitName = unit_name => (
      <Typography noWrap className={classes.unitTitleMinimal} variant="body2">
        {prettify(unit_name)}
      </Typography>
    );

    const reinforcementCard = (unit, index, mobile) => (
      <>
        <Badge classes={{ badge: classes.unitPointsBadge }} badgeContent={floatingValue(unit.points)}>
          <Card>
            <CardActionArea onClick={() => this.handleUnitClick(index)}>
              <CardMedia className={mobile ? classes.mediaMobile : classes.mediaDesktop} image={require("./../../assets/images/" + unit.image_path)} />
              {unitName(unit.name)}
            </CardActionArea>
          </Card>
        </Badge>
      </>
    );

    const chooseNameDialog = (
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
          <DialogContentText id="companyNameChoose-description">Choose a name for your new company unit</DialogContentText>
          <TextField onChange={event => this.setState({ companyUnitName: event.target.value })} autoFocus margin="dense" id="name" label="Name" />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleNameDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );

    const unitResumeCard = () => (
      <Card className={classes.unitResumeCard}>
        <CardContent>
          <Grid container direction="column" justify="space-evenly">
            <Grid item>
              <Grid container direction="row" justify="space-around" alignItems="center">
                <Grid item>
                  <Grid container direction="column" justify="space-evenly">
                    <Grid item>
                      <Typography component="h5" variant="h5">
                        {this.state.companyUnitName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color="textSecondary">
                        {prettify(this.state.newCompanyUnit.name)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <UnitCharacteristics characteristics={this.state.newCompanyUnit.characteristics} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Paper elevation={0} style={{ overflow: "hidden" }} className={classes.companyUnitImage}>
                    <img style={{ width: "100%", height: "auto" }} src={require("./../../assets/images/" + this.state.newCompanyUnit.image_path)} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );

    return (
      <>
        {selectedCompanyName === null ? (
          chooseCompany
        ) : (
          <div className={classes.contentWrapper}>
            <UtilsBar leftContent={companyHeader} />
            {console.log(this.state.newCompanyUnit)}
            {console.log(this.state.companyUnitName)}
            <AppBar position="static" color="default">
              <Tabs fullWidth value={this.state.tabValue} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab disabled={tabDisabled[0]} label="Base Unit" />
                <Tab disabled={tabDisabled[1]} label="Additional Equipement" />
                <Tab disabled={tabDisabled[2]} label="Confirm" />
              </Tabs>
            </AppBar>
            {chooseNameDialog}
            <SwipeableViews index={this.state.tabValue} onChangeIndex={this.handleTabChangeIndex}>
              <TabContainer style={{ padding: theme.spacing.unit * 2 }}>
                <Grid className={classes.tabMargin} container direction="row" justify="center" spacing={16}>
                  {(companyUnitName === "" || openDialogName === true) &&
                    companyUnits.map((unit, index) => (
                      <Grid item key={index}>
                        {/* Mobile */}
                        <MediaQuery query="(max-width: 960px)">{reinforcementCard(unit, index, true)}</MediaQuery>
                        {/* Desktop */}
                        <MediaQuery query="(min-width: 960px)">{reinforcementCard(unit, index, false)}</MediaQuery>
                      </Grid>
                    ))}
                </Grid>
                {companyUnitName !== "" && openDialogName === false && unitResumeCard()}
              </TabContainer>
              <TabContainer>
                <Typography>Additional Equipement</Typography>
              </TabContainer>
              <TabContainer>
                <Typography>Confirm</Typography>
              </TabContainer>
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
    { getCompanyFactions }
  )(withStyles(styles, { withTheme: true })(TroopCreator))
);
