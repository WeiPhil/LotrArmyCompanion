import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, CircularProgress, Grid } from "@material-ui/core";

import { fetchUserCompanies } from "../../redux/actions";
const mapStateToProps = ({ companyData = {}, isLoadingData = true }) => ({ companies: companyData.companies, isLoadingData });

class CompanyInformation extends Component {
  componentDidMount() {
    console.log("Company Information loading");
    this.props.fetchUserCompanies();
  }

  render() {
    const { isLoadingData, companies } = this.props;

    return (
      <div>
        {isLoadingData ? (
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUserCompanies }
)(CompanyInformation);
