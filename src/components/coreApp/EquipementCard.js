import React from "react";

import PropTypes from "prop-types";

import { withStyles, Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH } from "../../../utils/Constants";

import { prettify } from "./../../../utils/Functions";

const styles = theme => ({
  card: {
    padding: theme.spacing.unit * 2,
    width: CARD_MAX_WIDTH,
    height: CARD_IMAGE_HEIGHT
  },
  cardActionArea: {
    display: "flex"
  },
  cardContent: {
    padding: theme.spacing.unit * 2
  },
  wargearName: {
    color: theme.palette.type === "dark" ? theme.palette.grey["500"] : theme.palette.grey["600"]
  }
});

const EquipementCard = props => {
  const { classes, wargear } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Typography variant="h4" className={classes.wargearName}>
          {prettify(wargear.name)}
        </Typography>
        <Typography variant="h5" className={classes.wargearName}>
          {prettify(wargear.description)}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

EquipementCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(EquipementCard);
