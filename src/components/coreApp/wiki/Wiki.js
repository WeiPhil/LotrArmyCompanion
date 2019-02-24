import React from "react";
import { Grid } from "@material-ui/core";

import MediaQuery from "react-responsive";

import WikiCard from "./WikiCard";

const renderWikiCards = () => {
  return (
    <>
      <Grid item>
        <WikiCard imagePath={"armies.png"} title={"Armies"} text={"All the armies of Middle Earth"} />
      </Grid>
      <Grid item>
        <WikiCard imagePath={"magical_powers.jpg"} title={"Magical Powers"} text={"Check out all the magical powers available!"} />
      </Grid>
      <Grid item>
        <WikiCard imagePath={"equipements.jpg"} title={"Equipements"} text={"Need info about a specific weapon or it's effect?"} />
      </Grid>
      <Grid item>
        <WikiCard imagePath={"special_rules.jpg"} title={"Special Rules"} text={"All the Special Rules you have to know"} />
      </Grid>
    </>
  );
};

const Wiki = props => {
  return (
    <>
      <MediaQuery query="(max-width: 960px)">
        <Grid style={{ height: "100%" }} container direction="column" spacing={16} alignItems="stretch" justify="center">
          {renderWikiCards()}
        </Grid>
      </MediaQuery>
      <MediaQuery query="(min-width: 960px)">
        <Grid container direction="row" alignItems="center" justify="center" spacing={16}>
          {renderWikiCards()}
        </Grid>
      </MediaQuery>
    </>
  );
};

export default Wiki;
