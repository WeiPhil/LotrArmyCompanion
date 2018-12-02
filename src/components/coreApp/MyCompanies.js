import React, { Component } from "react";
import { connect } from "react-redux";

import { CircularProgress, Grid, withStyles, Fab } from "@material-ui/core";

import { fetchUserCompanies, fetchArmies } from "../../redux/actions";

import CompanyCard from "./CompanyCard";
import AddIcon from "@material-ui/icons/Add";

const mapStateToProps = ({
  companiesData = {},
  armiesData = {},
  fetchError,
  isLoadingArmies,
  isLoadingCompanies,
  armiesNeedRefetch,
  companiesNeedRefetch
}) => ({
  companies: companiesData.companies,
  armies: armiesData,
  isLoadingCompanies,
  isLoadingArmies,
  armiesNeedRefetch,
  companiesNeedRefetch,
  fetchError
});

const styles = theme => ({
  addCompany: {
    margin: theme.spacing.unit
  }
});

class MyCompanies extends Component {
  componentDidMount() {
    console.log("Company Information loading");
    if (this.props.companiesNeedRefetch) this.props.fetchUserCompanies();
    if (this.props.armiesNeedRefetch) this.props.fetchArmies();
  }

  render() {
    const { isLoadingArmies, isLoadingCompanies, fetchError, companies, armies, classes, theme } = this.props;

    return (
      <>
        {isLoadingArmies || isLoadingCompanies || fetchError ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <>
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
          </>
        )}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { fetchUserCompanies, fetchArmies }
  )(MyCompanies)
);
