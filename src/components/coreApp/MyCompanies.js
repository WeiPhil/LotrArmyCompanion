import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Grid, withStyles, Fab } from "@material-ui/core";

import CompanyCard from "./CompanyCard";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  addCompany: {
    margin: theme.spacing.unit
  }
});

class MyCompanies extends Component {
  render() {
    const { companies, armies, classes, theme } = this.props;

    return (
      <Grid container justify="center" alignItems="center" spacing={16}>
        {companies.map((company, index) => (
          <Grid item key={index}>
            <CompanyCard company={company} armies={armies} />
          </Grid>
        ))}
        <Grid item>
          <Fab className={classes.addCompany} variant="extended" color="primary" aria-label="Add">
            <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Create a new Company
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

MyCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
  armies: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(connect()(MyCompanies));
