import React, { Component } from "react";
import PropTypes from "prop-types";

import CompanyUnitCard from "./CompanyUnitCard";
import { Grid, withStyles, Fab } from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";

import MediaQuery from "react-responsive";

const styles = theme => ({
  addCompanyUnit: {
    margin: theme.spacing.unit,
    fontSize: "12px"
  }
});

class CompanyUnitsOverview extends Component {
  renderCompanyUnitCard(company_unit, index, mobile) {
    return (
      <Grid item key={index}>
        <CompanyUnitCard company_unit={company_unit} injured={this.props.company.injured} isCompanyCard mobile={mobile} timeout={index * 1000} />
      </Grid>
    );
  }

  render() {
    const { company, classes, theme } = this.props;

    const company_units = company.company_units;

    console.log(company_units);

    return (
      <>
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
            {Object.keys(company_units).map((company_unit_name, index) => this.renderCompanyUnitCard(company_units[company_unit_name], index, true))}
            <Grid item>
              <Fab className={classes.addCompanyUnit} variant="extended" color="primary" aria-label="Add">
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" alignItems="stretch" justify="center" spacing={16}>
            {Object.keys(company_units).map((company_unit_name, index) => this.renderCompanyUnitCard(company_units[company_unit_name], index, false))}
            <Grid item style={{ margin: "auto 0" }}>
              <Fab className={classes.addCompanyUnit} variant="extended" color="primary" aria-label="Add">
                <AddIcon style={{ marginRight: theme.spacing.unit, marginBottom: 2 }} /> Buy new Troop
              </Fab>
            </Grid>
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

CompanyUnitsOverview.propTypes = {
  company: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CompanyUnitsOverview);