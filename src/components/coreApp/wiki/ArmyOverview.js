import React, { Component } from "react";

import ArmyTroopCard from "./ArmyTroopCard";
import { Grid, withStyles, InputBase, IconButton, Icon } from "@material-ui/core/";

import MediaQuery from "react-responsive";
import UtilsBar from "../UtilsBar";
import SearchIcon from "@material-ui/icons/Search";

import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.type === "dark" ? fade(theme.palette.common.white, 0.15) : fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? fade(theme.palette.common.white, 0.25) : fade(theme.palette.common.black, 0.15)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});
class ArmyOverview extends Component {
  state = {
    initialUnitsNames: [],
    unitsNames: [],
    searched: ""
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

  handleSearch = event => {
    const searchQuery = event.target.value;
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

  // handleSearch = event => {
  //   this.props.onSearch(event.target.value);
  // };

  render() {
    const { classes, theme } = this.props;

    const rightBarContent = (
      <>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onChange={this.handleSearch}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
        <IconButton style={{ marginLeft: theme.spacing.unit }}>
          <Icon>more_vert</Icon>
        </IconButton>
      </>
    );
    // Small gap for the chat in the bottom
    return (
      <>
        <UtilsBar rightContent={rightBarContent} />
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

export default withStyles(styles, { withTheme: true })(ArmyOverview);
