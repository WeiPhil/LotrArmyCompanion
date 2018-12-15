import React from "react";

import ArmyTroopCard from "./ArmyTroopCard";
import { Grid } from "@material-ui/core/";

import { createCardData } from "../../DataCreation";

import MediaQuery from "react-responsive";

function renderCard(troopName, index, troops, mobile) {
  const { baseTroop } = createCardData(troops[troopName], false, null, null);

  return (
    <Grid item key={index}>
      {/* <TumbnailTroop troopName={troopName} mobile={mobile} baseTroop={baseTroop} /> */}
      <ArmyTroopCard baseTroop={baseTroop} mobile={mobile} />
    </Grid>
  );
}

const ArmyOverview = props => {
  const { troops } = props;

  return (
    <>
      {/* Mobile */}
      <MediaQuery query="(max-width: 960px)">
        <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
          {Object.keys(troops).map((troopName, index) => renderCard(troopName, index, troops, true))}
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
    </>
  );
};

export default ArmyOverview;
