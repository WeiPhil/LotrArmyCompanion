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
  wikiTitle: {
    margin: theme.spacing.unit * 2,
    fontWeight: 450,
    color: theme.palette.type === "dark" ? theme.palette.grey["500"] : theme.palette.grey["600"]
  },
  wikiSubtitle: {
    margin: theme.spacing.unit * 2,
    fontWeight: 400,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  },
  media: {
    height: CARD_IMAGE_HEIGHT * 1.5
  }
});

const WikiCard = props => {
  const { classes, imagePath, title, text } = props;

  const path = title.replace(/\s+/g, "_").toLowerCase();

  return (
    <Card className={classes.card}>
      <Link to={"/wiki/" + path} style={{ textDecoration: "none", color: "inherit" }}>
        <CardActionArea>
          <CardMedia className={classes.media} image={require("./../../../assets/images/" + imagePath)} />
          <Typography variant="h6" className={classes.wikiTitle}>
            {title}
          </Typography>
          <Typography variant="body2" className={classes.wikiSubtitle}>
            {text}
          </Typography>
        </CardActionArea>
      </Link>
    </Card>
  );
};

WikiCard.propTypes = {
  classes: PropTypes.object.isRequired,
  imagePath: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(WikiCard);
