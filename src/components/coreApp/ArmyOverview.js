import React, { Component } from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, CircularProgress } from "@material-ui/core/";

import { fetchUserCompanies, fetchArmies } from "./../../redux/actions/index";

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

  createCardData(troopData, isCompanyCard, companyFaction) {
    const userTroop = {
      access_name: troopData["access_name"],
      display_name: troopData["display_name"],
      unit_name: troopData["unit_name"],
      unit_type: troopData["unit_type"],
      troop_type: troopData["troop_type"],
      points: troopData["points"],
      experience: troopData["experience"],
      improvements: troopData["improvements"],
      wargear: troopData["wargear"],
      injuries: troopData["injuries"],
      special_rules: troopData["special_rules"],
      heroic_actions: troopData["heroic_actions"],
      magical_powers: troopData["magical_powers"],
      notes: troopData["notes"],
      image_path: require("./../../assets/images/" + troopData["image_path"])
    };

    const unit_name = userTroop.unit_name;

    const baseTroop = this.props.armies[companyFaction][unit_name];

    if (isCompanyCard) {
      return {
        userTroop: userTroop,
        baseTroop: {
          points: baseTroop["points"],
          name: baseTroop["display_name"],
          unit_type: baseTroop["unit_type"],
          troop_type: baseTroop["troop_type"],
          base_wargear: baseTroop["base_wargear"],
          optional_wargear: baseTroop["optional_wargear"],
          special_rules: baseTroop["special_rules"],
          heroic_actions: baseTroop["heroic_actions"],
          magical_powers: baseTroop["magical_powers"],
          description: baseTroop["description"],
          characteristics: baseTroop["characteristics"]
        }
      };
    }
  }

  renderCard(troop, index, companyIdx) {
    const { userTroop, baseTroop } = this.createCardData(troop, true, this.props.companies[companyIdx].faction_access_name);

    return (
      <Grid item key={index}>
        <CompanyTroopCard baseTroop={baseTroop} userTroop={userTroop} isCompanyCard />
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
              <Grid container direction="row" alignItems="stretch" justify="space-between" spacing={16}>
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
