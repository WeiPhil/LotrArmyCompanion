import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MediaQuery from "react-responsive";

import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import { Link } from "react-router-dom";

import { getCompanyFactions } from "../../redux/actions/databaseAccess";

const styles = theme => ({
  template: {
    width: 10
  }
});

const mapStateToProps = ({ data }) => ({
  companyFactions: data.companyFactions,
  companyFactionsNeedRefetch: data.companyFactionsNeedRefetch
});

class TroopCreator extends Component {
  state = {};

  componentDidMount() {
    if (this.props.companyFactionsNeedRefetch) this.props.getCompanyFactions();
  }

  render() {
    return (
      <>
        {/* Mobile */}
        <MediaQuery query="(max-width: 960px)">
          <Grid container direction="column" spacing={16} justify="center" alignItems="stretch">
            TroopCreator
          </Grid>
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery query="(min-width: 960px)">
          <Grid container direction="row" alignItems="baseline" justify="space-between">
            TroopCreator
          </Grid>
        </MediaQuery>
      </>
    );
  }
}

TroopCreator.propTypes = {
  classes: PropTypes.object
};

export default withRouter(
  connect(
    mapStateToProps,
    { getCompanyFactions }
  )(withStyles(styles, { withTheme: true })(TroopCreator))
);
