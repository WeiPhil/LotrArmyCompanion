import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const mapStateToProps = state => {
  return { articles: state.userCompanies.companies[0].troops };
};

const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map((el, index) => (
      <li className="list-group-item" key={index}>
        <Typography variant="h6">{el.display_name}</Typography>
      </li>
    ))}
  </ul>
);

export default connect(mapStateToProps)(ConnectedList);
