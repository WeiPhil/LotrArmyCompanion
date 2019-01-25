import React, { Component } from "react";

import ArmyTroopCard from "./ArmyTroopCard";
import { Grid } from "@material-ui/core/";

import MediaQuery from "react-responsive";
import UtilsBar from "../UtilsBar";

class ArmyOverview extends Component {
  state = {
    initialUnitsNames: [],
    unitsNames: []
  };

  renderCard(unitName, index, mobile) {
    return (
      <Grid item key={index}>
        <ArmyTroopCard unit={this.props.units[unitName]} mobile={mobile} timeout={index * 250} />
      </Grid>
    );
  }

  componentWillMount() {
    const unitsName = Object.keys(this.props.units).map(unitName => unitName);
    this.setState({ unitsNames: unitsName });
    this.setState({ initialUnitsNames: unitsName });
  }

  handleSearchChange = searchQuery => {
    var updatedUnitsNames = this.state.initialUnitsNames;
    updatedUnitsNames = updatedUnitsNames.filter(unitName => {
      return (
        unitName
          .toLowerCase()
          .split("_")
          .join(" ")
          .includes(searchQuery.toLowerCase()) || searchQuery === ""
      );
    });
    this.setState({ unitsNames: updatedUnitsNames });
  };

  render() {
    // Small gap for the chat in the bottom
    return (
      <>
        <UtilsBar onSearch={this.handleSearchChange} />
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
            {this.state.unitsNames.map((unitName, index) => {
              return this.renderCard(unitName, index, true);
            })}
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
            {this.state.unitsNames.map((unitName, index) => {
              return this.renderCard(unitName, index, false);
            })}
          </Grid>
        </MediaQuery>
        {/* <TumbnailTroop /> */}
      </>
    );
  }
}

export default ArmyOverview;
