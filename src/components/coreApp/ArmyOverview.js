import React, { Component } from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, CircularProgress } from "@material-ui/core/";

import { fetchUserCompanies, fetchArmies } from "./../../redux/actions/index";

import { createCardData } from "./../DataCreation";

import MediaQuery from "react-responsive";

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

class ArmyOverview extends Component {
  componentDidMount() {
    console.log("Army Overview loading");
    if (this.props.companiesNeedRefetch) this.props.fetchUserCompanies();
    if (this.props.armiesNeedRefetch) this.props.fetchArmies();
  }

  renderCard(troop, index, companyIdx) {
    const { userTroop, baseTroop } = createCardData(troop, true, this.props.companies[companyIdx].faction_access_name, this.props.armies);

    return (
      <Grid item key={index}>
        <CompanyTroopCard baseTroop={baseTroop} userTroop={userTroop} injured={this.props.companies[companyIdx].injured} isCompanyCard />
      </Grid>
    );
  }

  render() {
    const { isLoadingArmies, isLoadingCompanies, fetchError, companies } = this.props;

    return (
      <>
        {isLoadingArmies || isLoadingCompanies || fetchError ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <>
            <MediaQuery query="(max-width: 960px)">
              <Grid container direction="column" spacing={16} alignItems="stretch" justify="center">
                {companies.map((company, idx) => company.troops.map((troop, index) => this.renderCard(troop, index, idx)))}
              </Grid>
            </MediaQuery>
            <MediaQuery query="(min-width: 960px)">
              <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
                {companies.map((company, idx) => company.troops.map((troop, index) => this.renderCard(troop, index, idx)))}
              </Grid>
            </MediaQuery>
          </>
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUserCompanies, fetchArmies }
)(ArmyOverview);
