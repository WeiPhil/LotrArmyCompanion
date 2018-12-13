import React from "react";

import PropTypes from "prop-types";

import { withStyles, Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH } from "../../../utils/Constants";

import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      width: CARD_MAX_WIDTH
    }
  },
  cardActionArea: {
    display: "flex"
  },
  cardContent: {
    padding: theme.spacing.unit * 2
  },
  armyName: {
    fontWeight: 450,
    color: theme.palette.type === "dark" ? theme.palette.grey["500"] : theme.palette.grey["600"],
    margin: "auto " + theme.spacing.unit * 2 + "px",
    // paddingLeft: theme.spacing.unit * 2,
    // paddingRight: theme.spacing.unit * 2,
    display: "flex"
  },
  media: {
    marginLeft: 0,
    display: "flex",
    height: CARD_IMAGE_HEIGHT * 0.5,
    width: CARD_IMAGE_HEIGHT * 0.5
  }
});

function prettify(str) {
  return str
    .split("_")
    .map(part => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

const ArmyCard = props => {
  const { classes, armyName } = props;

  return (
    <Card className={classes.card}>
      <Link to={"/wiki/armies/" + armyName} style={{ textDecoration: "none", color: "inherit" }}>
        <CardActionArea>
          <div className={classes.cardActionArea}>
            <CardMedia image={require("./../../../assets/images/" + armyName + ".jpg")} className={classes.media} />

            <Typography variant="h6" className={classes.armyName}>
              {prettify(armyName)}
            </Typography>
          </div>
        </CardActionArea>
      </Link>
    </Card>
  );
};

ArmyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ArmyCard);
