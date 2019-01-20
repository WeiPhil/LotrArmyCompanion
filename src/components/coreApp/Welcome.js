import React from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import InlineLink from "./../customs/InlineLink";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 3
  },
  divider: {
    margin: theme.spacing.unit
  }
});

const mapStateToProps = ({ data, auth }) => ({
  hasNoCompanies: data.hasNoCompanies,
  loggedIn: auth.loggedIn
});

const Welcome = props => {
  const { hasNoCompanies, loggedIn, classes } = props;

  return (
    <Grid className={classes.container} container direction={"column"}>
      <Grid item>
        <Typography align="center" variant="h4" gutterBottom>
          Welcome to the Lord of the Ring Companion app!
        </Typography>
        <Divider className={classes.divider} />
        {loggedIn && hasNoCompanies && <InlineLink key="newAccount" align="center" path={"/companyCreator"} text={"Create your first company here!"} />}
        {!loggedIn && [
          <Typography key="newAccountHeader" align="center" variant="body2" gutterBottom>
            You don't have an account yet?
          </Typography>,
          <InlineLink key="newAccount" align="center" path={"/register"} text={" Create an account here!"} />
        ]}
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Welcome));
