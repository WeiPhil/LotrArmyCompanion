import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { CARD_MAX_WIDTH } from "../../../utils/Constants";
import { Card, CardContent, Typography, Grow, Badge, Chip, Avatar } from "@material-ui/core";
import { prettify } from "../../../utils/Functions";
import { EquipementIcon } from "../../icons/CharacteristicsIcons";

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
  },
  goldCost: {
    right: theme.spacing.unit * 0.5
  },
  type: {
    left: -theme.spacing.unit
  },
  statusAvatarMinimal: {
    boxShadow: "0px 3px 10px rgba(0,0,0,.6)",
    height: 18,
    fontSize: 10,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.paper : theme.palette.primary.light
  }
});

class EquipementCard extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    },
    open: false
  };

  render() {
    const { equipement, classes, mobile, timeout, theme } = this.props;

    const heightStyle = !mobile ? { height: "100%" } : undefined;
    return (
      <Grow in={true} timeout={timeout}>
        <div style={heightStyle}>
          <Badge
            classes={{ badge: classes.goldCost }}
            badgeContent={
              <Typography className={classes.pointsMinimal} variant="subtitle2">
                <Chip className={classes.statusAvatarMinimal} label={"Gold " + equipement.low_cost + "/" + equipement.high_cost} />
              </Typography>
            }
          >
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{prettify(equipement.name)}</Typography>
                <Typography variant="body2" className={classes.description}>
                  <b>Description</b>&nbsp;&nbsp;{equipement.description}
                </Typography>
              </CardContent>
            </Card>
          </Badge>
        </div>
      </Grow>
    );
  }
}

EquipementCard.propTypes = {
  classes: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(EquipementCard);
