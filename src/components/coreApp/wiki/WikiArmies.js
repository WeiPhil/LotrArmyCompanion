import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import MediaQuery from "react-responsive";

import ArmyCard from "./ArmyCard";

const WikiArmies = props => {
  const { armies } = props;

  const renderArmyCards = () => {
    return Object.keys(armies).map((armyName, key) => {
      return (
        <Grid item key={key}>
          <ArmyCard armyName={armyName} />
        </Grid>
      );
    });
  };

  return (
    <>
      <MediaQuery query="(max-width: 960px)">
        <Grid style={{ height: "100%" }} container direction="column" spacing={16} alignItems="stretch" justify="center">
          {renderArmyCards()}
        </Grid>
      </MediaQuery>
      <MediaQuery query="(min-width: 960px)">
        <Grid container direction="row" alignItems="center" justify="center" spacing={16}>
          {renderArmyCards()}
        </Grid>
      </MediaQuery>
    </>
  );
};

WikiArmies.propTypes = {
  armies: PropTypes.object.isRequired
};

export default WikiArmies;
