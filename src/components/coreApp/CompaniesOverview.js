import React, { Component } from "react";
import PropTypes from "prop-types";

import CompanyTroopCard from "./CompanyTroopCard";
import { Grid, withStyles, Fab } from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";

import MediaQuery from "react-responsive";

const styles = theme => ({
  addTroop: {
    margin: theme.spacing.unit,
    fontSize: "12px"
    // marginRight: theme.spacing.unit,
    // marginBottom: 2
  }
});

class CompaniesOverview extends Component {
  renderCard(troop, index, companyIdx, mobile) {
    const company_unit = troop;
    const unit_name = company_unit.unit_name;

    const unit = this.props.armies[company_unit["faction_name"]][unit_name];

    return (
      <Grid item key={index}>
        <CompanyTroopCard
          unit={unit}
          company_unit={company_unit}
          injured={this.props.companies[companyIdx].injured}
          isCompanyCard
          mobile={mobile}
          timeout={index * 1000}
        />
      </Grid>
    );
  }

  render() {
    const { companies, classes, theme, companyIndex } = this.props;

    return (
      <>
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
            {companies[companyIndex].troops.map((troop, index) => this.renderCard(troop, index, companyIndex, true))}

            <Grid item>
              <Fab className={classes.addTroop} variant="extended" color="primary" aria-label="Add">
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
            {companies[companyIndex].troops.map((troop, index) => this.renderCard(troop, index, companyIndex, false))}
            <Grid item style={{ margin: "auto 0" }}>
              <Fab className={classes.addTroop} variant="extended" color="primary" aria-label="Add">
                <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Buy new Troop
              </Fab>
            </Grid>
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

CompaniesOverview.propTypes = {
  companies: PropTypes.array.isRequired,
  armies: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CompaniesOverview);
