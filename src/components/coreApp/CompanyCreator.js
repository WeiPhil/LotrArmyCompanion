import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

import MediaQuery from "react-responsive";

// class CompanyCreator extends Component {
//   render() {
//     return (
//       <>
//         {/* Mobile */}
//         <MediaQuery query="(max-width: 960px)">
//           <Grid container direction="column" spacing={16} justify="center" alignItems="stretch">
//             Test
//           </Grid>
//         </MediaQuery>
//         {/* Desktop */}
//         <MediaQuery query="(min-width: 960px)">
//           <Grid container direction="row" justify="center" alignItems="stretch" spacing={16}>
//             Test
//           </Grid>
//         </MediaQuery>
//       </>
//     );
//   }
// }

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ["New Company Name", "Faction", "Notes"];
}

function aContentTest() {
  return <TextField variant="outlined" required label="Company Name" value={""} margin="normal" />;
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return aContentTest();
    case 1:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

class CompanyCreator extends Component {
  state = {
    activeStep: 0
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

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </>
    );
  }
}

CompanyCreator.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(CompanyCreator);
