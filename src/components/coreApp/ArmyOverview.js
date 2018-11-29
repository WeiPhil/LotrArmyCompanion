import React, { Component } from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, CircularProgress } from "@material-ui/core/";

import { fetchUserCompanies } from "./../../redux/actions/index";

function renderCard(troop, index) {
  return <CompanyTroopCard key={index} troopData={troop} />;
}

const mapStateToProps = ({ companyData = {}, fetchError, isLoadingData }) => ({
  companies: companyData.companies,
  isLoadingData,
  fetchError
});

class ArmyOverview extends Component {
  componentDidMount() {
    console.log("Army Overview loading");
    this.props.fetchUserCompanies();
  }

  render() {
    const { isLoadingData, fetchError } = this.props;

    return (
      <Grid container justify="space-evenly">
        {isLoadingData || fetchError ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          this.props.companies.map((company, idx) => company.troops.map((troop, index) => renderCard(troop, index)))
        )}
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUserCompanies }
)(ArmyOverview);
