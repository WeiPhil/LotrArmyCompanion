import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import MediaQuery from "react-responsive";

import Typography from "@material-ui/core/Typography";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Icon,
  Dialog,
  CircularProgress
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import { getCompanyFactions, addCompany, postStatusReset } from "../../redux/actions/databaseAccess";

const styles = theme => ({
  companyList: {
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 400,
    marginTop: theme.spacing.unit * 5
  },
  companyListMobile: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    marginTop: theme.spacing.unit * 3
  },
  companyResume: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
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
  listIcons: {
    color: theme.palette.type === "dark" ? "#FFFFFF" : theme.palette.secondary.main,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  confirmButton: {
    marginTop: theme.spacing.unit
  }
});

function getSteps() {
  return ["Company Name", "Company Faction", "Additional Notes"];
}

const mapStateToProps = ({ auth, data, databaseAccess }) => ({
  username: auth.username,
  companyFactions: data.companyFactions,
  companyFactionsNeedRefetch: databaseAccess.companyFactionsNeedRefetch,
  isLoadingCompanyFactions: databaseAccess.isLoadingCompanyFactions,
  postingToDatabase: databaseAccess.postingToDatabase,
  postingSuccess: databaseAccess.postingSuccess,
  postResponse: databaseAccess.postResponse
});

class CompanyCreator extends Component {
  state = {
    activeStep: 0,
    companyName: "",
    companyFactionName: "",
    companyNotes: "",
    groupedCompanyFactions: {},
    redirectToHome: false
  };

  componentDidMount() {
    const companyFactions = this.props.companyFactions;
    var peoples = {};
    for (var companyFactionName in companyFactions) {
      var list = peoples[companyFactions[companyFactionName].people];

      if (list) {
        peoples[companyFactions[companyFactionName].people].push(companyFactionName);
      } else {
        peoples[companyFactions[companyFactionName].people] = [companyFactionName];
      }
    }
    this.setState({ groupedCompanyFactions: peoples });
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  companyFactionClicked = companyFactionName => {
    this.setState({ companyFactionName: companyFactionName });
    this.handleNext();
  };

  chooseCompanyFaction = mobile => {
    const { groupedCompanyFactions } = this.state;

    return (
      <>
        <Typography gutterBottom variant="h6">
          Choose your company faction
        </Typography>
        <List className={mobile ? this.props.classes.companyListMobile : this.props.classes.companyList} subheader={<li />}>
          {Object.keys(groupedCompanyFactions).map(people => (
            <li key={`section-${people}`} className={this.props.classes.listSection}>
              <ul className={this.props.classes.ul}>
                <ListSubheader>{people}</ListSubheader>
                {groupedCompanyFactions[people].map(companyFactionName => (
                  <ListItem button key={companyFactionName} onClick={() => this.companyFactionClicked(companyFactionName)}>
                    <Icon fontSize="small" className={this.props.classes.listIcons}>
                      bookmark
                    </Icon>
                    <ListItemText primary={companyFactionName} />
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
        <TextField
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.handleNext();
            }
          }}
          onChange={this.handleChange("companyName")}
          variant="standard"
          label="Company Name"
          value={this.state.companyName}
          margin="normal"
        />
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
          onChange={this.handleChange("companyNotes")}
          value={this.state.companyNotes}
          id="multiline-notes"
          label="Company Notes"
          multiline
          rows="5"
          margin="normal"
          variant="outlined"
        />
      </>
    );
  };

  getStepContent = (step, mobile) => {
    switch (step) {
      case 0:
        return this.chooseCompanyName();
      case 1:
        return this.chooseCompanyFaction(mobile);
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
    let companyData = {};
    companyData["username"] = this.props.username;
    companyData["companyName"] = this.state.companyName;
    companyData["companyFactionName"] = this.state.companyFactionName;
    companyData["companyNotes"] = this.state.companyNotes;
    this.props.addCompany(companyData);
  };

  handleInfoClose = () => {
    this.props.postStatusReset();
    window.location.reload();
    this.setState({ redirectToHome: true });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    if (this.state.redirectToHome === true) return <Redirect to="/" />;
    else
      return (
        <>
          {/* Mobile */}
          <MediaQuery query="(max-width: 960px)">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {this.getStepContent(index, true)}
                    {/* <div className={classes.actionsContainer}> */}
                    <div>
                      <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                      {activeStep !== steps.length - 1 && activeStep !== 1 && (
                        <Button onClick={this.handleNext} variant="contained" color="primary" className={classes.button}>
                          Next
                        </Button>
                      )}
                      {activeStep === steps.length - 1 && (
                        <Button onClick={this.validateNewCompany} variant="contained" color="primary" className={classes.button}>
                          Confirm and Save
                        </Button>
                      )}
                      {/* <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                          Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button> */}
                    </div>
                    {/* </div> */}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </MediaQuery>
          {/* Desktop */}
          <MediaQuery query="(min-width: 960px)">
            {/* <Paper className={classes.companyResume}>
              <Typography variant="h4">Company Name: {companyName}</Typography>
              <Typography variant="h5">Company Faction: {companyFactionName}</Typography>
              <Typography variant="body2">Notes : {companyNotes}</Typography>
            </Paper> */}
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
                <Grid item>{this.getStepContent(activeStep, false)}</Grid>
                <Grid item>
                  {activeStep !== steps.length - 1 && activeStep !== 1 && (
                    <Button onClick={this.handleNext} variant="contained" color="primary" className={classes.button}>
                      Next
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button onClick={this.validateNewCompany} variant="contained" color="primary" className={classes.button}>
                      Confirm and Save
                    </Button>
                  )}
                </Grid>
              </>
            </Grid>
            <Dialog onClose={this.handleInfoClose} open={this.props.postingSuccess}>
              <DialogTitle align="center">{"Company Creation"}</DialogTitle>
              <DialogContent>
                <DialogContentText>{this.props.postResponse}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className={classes.confirmButton} onClick={this.handleInfoClose} variant="contained" color="secondary" autoFocus>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.props.postingToDatabase}
              PaperProps={{
                style: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  overflow: "hidden"
                }
              }}
            >
              <CircularProgress />
            </Dialog>
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
    { getCompanyFactions, addCompany, postStatusReset }
  )(withStyles(styles, { withTheme: true })(CompanyCreator))
);
