import React, { Component } from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, CircularProgress, withStyles, Fab } from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";

import { getUserCompanies, getArmies } from "../../redux/actions/databaseAccess";

import { createCardData } from "../DataCreation";

import MediaQuery from "react-responsive";

const mapStateToProps = ({ data, databaseAccess }) => ({
  companies: data.companies.companies,
  armies: data.armies,
  isLoadingCompanies: databaseAccess.isLoadingCompanies,
  isLoadingArmies: databaseAccess.isLoadingArmies,
  companiesNeedRefetch: databaseAccess.companiesNeedRefetch,
  armiesNeedRefetch: databaseAccess.armiesNeedRefetch
});

const styles = theme => ({
  addTroop: {
    margin: theme.spacing.unit
  }
});

class CompaniesOverview extends Component {
  componentDidMount() {
    console.log("Army Overview loading");
    if (this.props.companiesNeedRefetch) this.props.getUserCompanies();
    if (this.props.armiesNeedRefetch) this.props.getArmies();
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
    const {
      isLoadingArmies,
      isLoadingCompanies,
      companies,
      classes,
      theme,
      companyIndex,
      companiesNeedRefetch,
      armiesNeedRefetch
    } = this.props;
    // const companyIndex = this.props.route.companyIndex;
    return (
      <>
        {isLoadingArmies || isLoadingCompanies || companiesNeedRefetch || armiesNeedRefetch ? (
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
                    <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Buy new Troop
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
    { getArmies, getUserCompanies }
  )(CompaniesOverview)
);
