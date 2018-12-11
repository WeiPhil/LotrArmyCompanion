import React, { Component } from "react";
import { connect } from "react-redux";

import { CircularProgress, Grid, withStyles, Fab } from "@material-ui/core";

import { getUserCompanies, getArmies } from "../../redux/actions/databaseAccess";

import CompanyCard from "./CompanyCard";
import AddIcon from "@material-ui/icons/Add";

const mapStateToProps = ({ data, databaseAccess }) => ({
  companies: data.companies.companies,
  armies: data.armies,
  isLoadingCompanies: databaseAccess.isLoadingCompanies,
  isLoadingArmies: databaseAccess.isLoadingArmies,
  companiesNeedRefetch: databaseAccess.companiesNeedRefetch,
  armiesNeedRefetch: databaseAccess.armiesNeedRefetch
});

const styles = theme => ({
  addCompany: {
    margin: theme.spacing.unit
  }
});

class MyCompanies extends Component {
  componentDidMount() {
    console.log("Company Information loading");
    if (this.props.companiesNeedRefetch) this.props.getUserCompanies();
    if (this.props.armiesNeedRefetch) this.props.getArmies();
  }

  render() {
    const { isLoadingArmies, isLoadingCompanies, companiesNeedRefetch, armiesNeedRefetch, companies, armies, classes, theme } = this.props;

    return (
      <>
        {isLoadingArmies || isLoadingCompanies || companiesNeedRefetch || armiesNeedRefetch ? (
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
    { getUserCompanies, getArmies }
  )(MyCompanies)
);
