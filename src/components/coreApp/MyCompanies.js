import React, { Component } from "react";

import { Grid, withStyles, Fab } from "@material-ui/core";

import CompanyCard from "./CompanyCard";
import AddIcon from "@material-ui/icons/Add";

import MediaQuery from "react-responsive";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const styles = theme => ({
  addCompany: {
    margin: theme.spacing.unit
  }
});

class MyCompanies extends Component {
  render() {
    const { companies, classes, theme, hasNoCompanies } = this.props;

    return (
      <>
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="column" spacing={16} justify="center" alignItems="stretch">
            <Grid item style={{ margin: "0 auto" }}>
              <Link to="/companyCreator" style={{ textDecoration: "none" }}>
                <Fab className={classes.addCompany} variant="extended" color="primary" aria-label="Add">
                  <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Create a new Company
                </Fab>
              </Link>
            </Grid>
            {!hasNoCompanies &&
              companies.map((company, index) => (
                <Grid item key={index}>
                  <CompanyCard company={company} />
                </Grid>
              ))}
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" justify="center" alignItems="stretch" spacing={16}>
            {!hasNoCompanies &&
              companies.map((company, index) => (
                <Grid item key={index}>
                  <CompanyCard company={company} />
                </Grid>
              ))}
            <Grid item style={{ margin: "auto 0" }}>
              <Link to="/companyCreator" style={{ textDecoration: "none" }}>
                <Fab className={classes.addCompany} variant="extended" color="primary" aria-label="Add">
                  <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Create a new Company
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(MyCompanies));
