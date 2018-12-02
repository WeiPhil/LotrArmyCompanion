import React, { Component } from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, CircularProgress, withStyles, Fab } from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";

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

const styles = theme => ({
  addTroop: {
    margin: theme.spacing.unit
  }
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
    const { isLoadingArmies, isLoadingCompanies, fetchError, companies, classes, theme, companyIndex } = this.props;
    // const companyIndex = this.props.route.companyIndex;
    return (
      <>
        {isLoadingArmies || isLoadingCompanies || fetchError ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <>
            <MediaQuery query="(max-width: 960px)">
              <Grid style={{ height: "100%" }} container direction="column" spacing={16} alignItems="stretch" justify="center">
                <Grid item>
                  <Fab className={classes.addCompany} variant="extended" color="primary" aria-label="Add">
                    <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Create a new Company
                  </Fab>
                </Grid>
                {companies[companyIndex].troops.map((troop, index) => this.renderCard(troop, index, companyIndex))}
              </Grid>
            </MediaQuery>
            <MediaQuery query="(min-width: 960px)">
              <Grid container direction="row" alignItems="center" justify="center" spacing={16}>
                {companies[companyIndex].troops.map((troop, index) => this.renderCard(troop, index, companyIndex))}
                <Grid item>
                  <Fab className={classes.addTroop} variant="extended" color="primary" aria-label="Add">
                    <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Buy a new Unit
                  </Fab>
                </Grid>
              </Grid>
            </MediaQuery>
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
  )(ArmyOverview)
);
