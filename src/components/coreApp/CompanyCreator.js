import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import MediaQuery from "react-responsive";

import Typography from "@material-ui/core/Typography";
import { Button, TextField, Grid, List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import { getCompanyFactions } from "../../redux/actions/databaseAccess";

const styles = theme => ({
  companyList: {
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
    marginTop: theme.spacing.unit * 5
  },
  notesField: {
    maxWidth: 400
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

function getSteps() {
  return ["Company Name", "Company Faction", "Additional Notes"];
}

const mapStateToProps = ({ data, databaseAccess }) => ({
  companyFactions: data.companyFactions,
  companyFactionsNeedRefetch: databaseAccess.companyFactionsNeedRefetch
});

class CompanyCreator extends Component {
  state = {
    activeStep: 0,
    companyName: "",
    redirectToTroopCreator: false
  };

  componentDidMount() {
    if (this.props.companyFactionsNeedRefetch) this.props.getCompanyFactions();
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  chooseCompanyFaction = () => {
    return (
      <>
        <Typography gutterBottom variant="h6">
          Choose your company faction
        </Typography>
        <List className={this.props.classes.companyList} subheader={<li />}>
          {["Good", "Evil"].map(companyAlignment => (
            <li key={`section-${companyAlignment}`} className={this.props.classes.listSection}>
              <ul className={this.props.classes.ul}>
                <ListSubheader>{companyAlignment}</ListSubheader>
                {companyAlignment === "Good" &&
                  ["Rohan"].map(item => (
                    <ListItem button key={`item-${companyAlignment}-${item}`} onClick={this.handleNext}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                {companyAlignment === "Evil" &&
                  this.props.companyFactions.map(item => (
                    <ListItem button key={`item-${companyAlignment}-${item}`} onClick={this.handleNext}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
              </ul>
            </li>
          ))}
        </List>
      </>
    );
  };

  chooseCompanyName = () => {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Choose your company name
        </Typography>
        <TextField onChange={this.handleChange("companyName")} variant="standard" label="Company Name" value={this.state.companyName} margin="normal" />
      </>
    );
  };

  personalNotes = () => {
    return (
      <>
        <Typography variant="h6">Add some personal notes</Typography>
        <Typography variant="body2">You can add some personal notes to your company here like background history,etc..</Typography>
        <TextField
          className={this.props.classes.notesField}
          fullWidth
          id="multiline-notes"
          label="MultilineNotes"
          multiline
          rows="5"
          margin="normal"
          variant="outlined"
        />
      </>
    );
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return this.chooseCompanyName();
      case 1:
        return this.chooseCompanyFaction();
      case 2:
        return this.personalNotes();
      default:
        return "Unknown step";
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  validateNewCompany = () => {
    this.setState({ redirectToTroopCreator: true });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    if (this.state.redirectToTroopCreator === true) return <Redirect to="/troopCreator" />;
    else
      return (
        <>
          {/* Mobile */}
          <MediaQuery query="(max-width: 960px)">
            <Grid container direction="column" spacing={16} justify="center" alignItems="stretch">
              Test
            </Grid>
          </MediaQuery>
          {/* Desktop */}
          <MediaQuery query="(min-width: 960px)">
            <Stepper activeStep={activeStep}>
              {steps.map(label => {
                const props = {};
                const labelProps = {};

                return (
                  <Step key={label} {...props}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div style={{ marginTop: "5vh" }} />
            <Grid container direction="row" alignItems="baseline" justify="space-between">
              <Grid item>
                <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={this.handleBack} className={classes.button}>
                  Back
                </Button>
              </Grid>

              <>
                <Grid item>{this.getStepContent(activeStep)}</Grid>
                <Grid item>
                  {activeStep !== steps.length - 1 && activeStep !== 1 && (
                    <Button onClick={this.handleNext} variant="contained" color="primary" className={classes.button}>
                      Next
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button onClick={this.validateNewCompany} variant="contained" color="primary" className={classes.button}>
                      Buy troops
                    </Button>
                  )}
                </Grid>
              </>
            </Grid>
          </MediaQuery>
        </>
      );
  }
}

CompanyCreator.propTypes = {
  classes: PropTypes.object
};

export default withRouter(
  connect(
    mapStateToProps,
    { getCompanyFactions }
  )(withStyles(styles, { withTheme: true })(CompanyCreator))
);
