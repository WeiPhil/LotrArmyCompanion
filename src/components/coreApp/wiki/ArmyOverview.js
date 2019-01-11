import React from "react";

import ArmyTroopCard from "./ArmyTroopCard";
import { Grid } from "@material-ui/core/";

import MediaQuery from "react-responsive";

function renderCard(troopName, index, troops, mobile) {
  return (
    <Grid item key={index}>
      <ArmyTroopCard unit={troops[troopName]} mobile={mobile} timeout={index * 1000} />
    </Grid>
  );
}

const ArmyOverview = props => {
  const { troops } = props;

  return (
    // Small gap for the chat in the bottom
    <div style={{ marginBottom: 20 }}>
      {/* Mobile */}
      <MediaQuery query="(max-width: 960px)">
        <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
          {Object.keys(troops).map((troopName, index) => renderCard(troopName, index, troops, true))}
        </Grid>
      </MediaQuery>
      {/* Desktop */}
      <MediaQuery query="(min-width: 960px)">
        <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
          {Object.keys(troops).map((troopName, index) => renderCard(troopName, index, troops, false))}
        </Grid>
      </MediaQuery>
      {/* <TumbnailTroop /> */}
    </div>
  );
};

export default ArmyOverview;
