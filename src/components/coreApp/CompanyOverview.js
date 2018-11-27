import React from "react";

import TroopCard from "./TroopCard";
import Grid from "@material-ui/core/Grid";

function renderCard(troop, index) {
  const troopName = Object.keys(troop)[0];
  return <TroopCard key={index} troopData={troop[troopName]} />;
}

function CompanyOverview(props) {
  const { dataFetched, troops } = props;

  console.log(troops);

  return (
    <Grid container justify="space-evenly">
      {dataFetched && troops.map((troop, index) => renderCard(troop, index))}
      {dataFetched && troops.map((troop, index) => renderCard(troop, index))}
    </Grid>
  );
}

export default CompanyOverview;
