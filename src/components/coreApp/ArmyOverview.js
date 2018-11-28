import React from "react";
import { connect } from "react-redux";

import CompanyTroopCard from "./CompanyTroopCard";
import Grid from "@material-ui/core/Grid";

function renderCard(troop, index) {
  return <CompanyTroopCard key={index} troopData={troop} />;
}

const mapStateToProps = state => {
  return { troops: state.userCompanies.companies[0].troops };
};

function ArmyOverview(props) {
  const { troops } = props;

  return (
    <Grid container justify="space-evenly">
      {troops.map((troop, index) => renderCard(troop, index))}
      {troops.map((troop, index) => renderCard(troop, index))}
    </Grid>
  );
}

export default connect(mapStateToProps)(ArmyOverview);
