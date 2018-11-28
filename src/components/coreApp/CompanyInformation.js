import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const mapStateToProps = state => {
  return { company: state.userCompanies.companies[0] };
};

function CompanyInformation(props) {
  const { company } = props;

  return (
    <div>
      <Typography variant="h6">Faction : {company.faction}</Typography>
      <Typography variant="h6">Victories : {company.victories}</Typography>
    </div>
  );
}

export default connect(mapStateToProps)(CompanyInformation);
