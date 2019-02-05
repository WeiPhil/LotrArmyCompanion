import React, { Component } from "react";
import Measure from "react-measure";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { CARD_MAX_WIDTH } from "../../../utils/Constants";
import { Card, CardContent, Typography, Grow, Collapse, Tooltip } from "@material-ui/core";
import { prettify } from "../../../utils/Functions";

const styles = theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      maxWidth: CARD_MAX_WIDTH
    }
  },
  description: {
    margin: theme.spacing.unit,
    fontWeight: 400,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  }
});

class SpecialRulesCard extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    },
    open: false
  };

  render() {
    const { specialRule, classes, mobile, timeout } = this.props;
    const { height } = this.state.dimensions;
    const { open } = this.state;

    const heightStyle = !mobile ? { height: "100%" } : undefined;
    return (
      <Grow in={true} timeout={timeout}>
        <div style={heightStyle}>
          <Card style={heightStyle} className={classes.card}>
            <CardContent>
              <Typography variant="h6">{prettify(specialRule.name)}</Typography>
              <Typography variant="body2" className={classes.description}>
                <b>Type</b>&nbsp;&nbsp;{specialRule.type === "active" ? "Active" : specialRule.type === "passive" ? "Passive" : "Other"}
              </Typography>
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef}>
                    {height > 60 ? (
                      <Tooltip title={open ? "See less" : "See more"} placement="top">
                        <Typography
                          variant="body2"
                          component="div"
                          onClick={() => this.setState({ open: !open })}
                          style={{ cursor: "pointer" }}
                          className={classes.description}
                        >
                          <b>Description </b>
                          <br />
                          {height > 60 ? (
                            <>
                              <Collapse in={open} collapsedHeight="100px">
                                {!open ? specialRule.description.substring(0, 150) + " ..." : specialRule.description}
                              </Collapse>
                            </>
                          ) : (
                            <>{specialRule.description}</>
                          )}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" component="div" className={classes.description}>
                        <b>Description </b>
                        <br />
                        {specialRule.description}
                      </Typography>
                    )}
                  </div>
                )}
              </Measure>
              <Typography variant="body2" className={classes.description}>
                <b>Origin</b>&nbsp;&nbsp;{specialRule.origin === "basic" ? "Rules Manual" : "Battle Companies"}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grow>
    );
  }
}

SpecialRulesCard.propTypes = {
  classes: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(SpecialRulesCard);
