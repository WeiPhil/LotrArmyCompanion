import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { Link, withRouter } from "react-router-dom";

const styles = theme => ({
  linkStyle: {
    color: theme.palette.primary.light,
    "&:hover": {
      textDecoration: "underline"
    },
    textDecoration: "none",
    margin: theme.spacing.unit
  }
});

class InlineLink extends Component {
  render() {
    const { align, onClick, style, classes, text = "This is a custom link", path = this.props.location.pathname, component = undefined } = this.props;

    return (
      <Typography component={component} align={align} style={style}>
        <Link onClick={onClick} className={classes.linkStyle} to={path}>
          {text}
        </Link>
      </Typography>
    );
  }
}

InlineLink.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(InlineLink));
