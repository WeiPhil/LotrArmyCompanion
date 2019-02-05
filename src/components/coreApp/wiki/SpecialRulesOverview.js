import React, { Component } from "react";
import { connect } from "react-redux";

import SpecialRuleCard from "./SpecialRuleCard";
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

const mapStateToProps = ({ data }) => ({
  specialRules: data.specialRules
});

class SpecialRulesOverview extends Component {
  state = {
    initialSpecialRulesNames: [],
    specialRulesNames: [],
    searched: ""
  };

  renderCard(specialRuleName, index, mobile) {
    return (
      <Grid item key={index}>
        <SpecialRuleCard specialRule={this.props.specialRules[specialRuleName]} mobile={mobile} timeout={index * 250} />
      </Grid>
    );
  }

  componentWillMount() {
    const specialRulesName = Object.keys(this.props.specialRules).map(specialRuleName => specialRuleName);
    this.setState({ specialRulesNames: specialRulesName });
    this.setState({ initialSpecialRulesNames: specialRulesName });
  }

  handleSearch = event => {
    const searchQuery = event.target.value;
    var updatedSpecialRulesNames = this.state.initialSpecialRulesNames;
    updatedSpecialRulesNames = updatedSpecialRulesNames.filter(specialRuleName => {
      return (
        specialRuleName
          .toLowerCase()
          .split("_")
          .join(" ")
          .includes(searchQuery.toLowerCase()) || searchQuery === ""
      );
    });
    this.setState({ specialRulesNames: updatedSpecialRulesNames });
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
            {this.state.specialRulesNames.map((specialRuleName, index) => {
              return this.renderCard(specialRuleName, index, true);
            })}
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
            {this.state.specialRulesNames.map((specialRuleName, index) => {
              return this.renderCard(specialRuleName, index, false);
            })}
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(SpecialRulesOverview));
