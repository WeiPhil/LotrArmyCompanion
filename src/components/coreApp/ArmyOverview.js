import React, { Component } from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, CircularProgress } from "@material-ui/core/";

import { fetchUserCompanies } from "./../../redux/actions/index";

function renderCard(troop, index) {
  return <CompanyTroopCard key={index} troopData={troop} />;
}

const mapStateToProps = ({ companyData = {}, isLoadingData = true }) => ({ companies: companyData.companies, isLoadingData });

class ArmyOverview extends Component {
  componentDidMount() {
    console.log("Army Overview loading");
    this.props.fetchUserCompanies();
  }

  render() {
    // const { troops } = this.props;

    return (
      <Grid container justify="space-evenly">
        {this.props.isLoadingData ? (
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
