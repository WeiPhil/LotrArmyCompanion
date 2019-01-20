import React, { Component } from "react";

import PropTypes from "prop-types";

import { Grid, withStyles, Fab } from "@material-ui/core";

import CompanyCard from "./CompanyCard";
import AddIcon from "@material-ui/icons/Add";

import MediaQuery from "react-responsive";

const styles = theme => ({
  addCompany: {
    margin: theme.spacing.unit
  }
});

class MyCompanies extends Component {
  render() {
    const { companies, classes, theme } = this.props;

    return (
      <>
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="column" spacing={16} justify="center" alignItems="stretch">
            <Grid item style={{ margin: "0 auto" }}>
              <Fab className={classes.addCompany} variant="extended" color="primary" aria-label="Add">
                <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Create a new Company
              </Fab>
            </Grid>
            {companies.map((company, index) => (
              <Grid item key={index}>
                <CompanyCard company={company} />
              </Grid>
            ))}
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" justify="center" alignItems="stretch" spacing={16}>
            {companies.map((company, index) => (
              <Grid item key={index}>
                <CompanyCard company={company} />
              </Grid>
            ))}
            <Grid item style={{ margin: "auto 0" }}>
              <Fab className={classes.addCompany} variant="extended" color="primary" aria-label="Add">
                <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Create a new Company
              </Fab>
            </Grid>
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

MyCompanies.propTypes = {
  companies: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(MyCompanies);
