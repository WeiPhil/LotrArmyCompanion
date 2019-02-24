import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, withStyles, InputBase, IconButton, Icon } from "@material-ui/core/";

import MediaQuery from "react-responsive";
import UtilsBar from "../UtilsBar";
import SearchIcon from "@material-ui/icons/Search";

import { fade } from "@material-ui/core/styles/colorManipulator";
import EquipementCard from "./EquipementCard";

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

const mapStateToProps = ({ data }) => ({
  equipements: data.equipements
});

class EquipementsOverview extends Component {
  state = {
    initialSpecialRulesNames: [],
    equipementsNames: [],
    searched: ""
  };

  renderCard(equipementName, index, mobile) {
    return (
      <Grid item key={index}>
        <EquipementCard equipement={this.props.equipements[equipementName]} mobile={mobile} timeout={index * 250} />
      </Grid>
    );
  }

  componentWillMount() {
    const equipementsName = Object.keys(this.props.equipements).map(equipementName => equipementName);
    this.setState({ equipementsNames: equipementsName });
    this.setState({ initialSpecialRulesNames: equipementsName });
  }

  handleSearch = event => {
    const searchQuery = event.target.value;
    var updatedEquipementsNames = this.state.initialSpecialRulesNames;
    updatedEquipementsNames = updatedEquipementsNames.filter(equipementName => {
      return (
        equipementName
          .toLowerCase()
          .split("_")
          .join(" ")
          .includes(searchQuery.toLowerCase()) || searchQuery === ""
      );
    });
    this.setState({ equipementsNames: updatedEquipementsNames });
  };

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

    return (
      <>
        <UtilsBar rightContent={rightBarContent} />
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
            {this.state.equipementsNames.map((equipementName, index) => {
              return this.renderCard(equipementName, index, true);
            })}
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
            {this.state.equipementsNames.map((equipementName, index) => {
              return this.renderCard(equipementName, index, false);
            })}
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(EquipementsOverview));
