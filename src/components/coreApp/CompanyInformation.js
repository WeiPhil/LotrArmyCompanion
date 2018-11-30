import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, CircularProgress, Grid } from "@material-ui/core";

import { fetchUserCompanies } from "../../redux/actions";
const mapStateToProps = ({ companiesData = {}, isLoadingCompanies, companiesNeedRefetch, fetchError }) => ({
  companies: companiesData.companies,
  fetchError,
  companiesNeedRefetch,
  isLoadingCompanies
});

class CompanyInformation extends Component {
  componentDidMount() {
    console.log("Company Information loading");
    if (this.props.companiesNeedRefetch) this.props.fetchUserCompanies();
  }

  render() {
    const { isLoadingCompanies, fetchError, companies } = this.props;
    return (
      <>
        {isLoadingCompanies || fetchError ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          companies.map((company, index) => (
            <Typography variant="h6" key={index}>
              {company.faction} has {company.victories} victories!
            </Typography>
          ))
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUserCompanies }
)(CompanyInformation);
