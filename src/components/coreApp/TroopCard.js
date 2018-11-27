import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import TroopCharacteristics from "./TroopCharacteristics";

import { CARD_WIDTH } from "./../../utils/Constants";
import { CARD_IMAGE_HEIGHT } from "./../../utils/Constants";

import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  card: {
    width: CARD_WIDTH,
    margin: theme.spacing.unit * 2
  },
  media: {
    height: CARD_IMAGE_HEIGHT
  }
});

function createCardData(troopData) {
  return {
    name: troopData["display_name"],
    unit_type: troopData["unit_type"],
    troop_type: troopData["troop_type"],
    // base_wargear: troopData["base_wargear"],
    optional_wargear: troopData["optional_wargear"],
    special_rules: troopData["special_rules"],
    heroic_actions: troopData["heroic_actions"],
    magical_powers: troopData["magical_powers"],
    // description: troopData["description"],
    characteristics: troopData["improvements"],
    image_path: require("./../../assets/images/" + troopData["image_path"])
  };
}

function TroopCard(props) {
  const { troopData, classes } = props;

  console.log(troopData);

  const troop = troopData !== undefined ? createCardData(troopData) : "undefined";

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={troop.image_path !== undefined ? troop.image_path : require("../../assets/images/tempCardBackground3.jpg")}
          title={troop.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {(troop.troop_type === "lieutnant" || troop.troop_type === "sergeant") && <Icon>star</Icon>}
            {troop.name}
          </Typography>
          <Hidden xsDown={true}>
            <TroopCharacteristics characs={troop.characteristics} />
          </Hidden>

          <Typography component="p">
            {troop.description}
            {/* Many Heroes have trained companion animals that accompany them on
            their campaigns. A hunting dog is considered part of the Hero’s
            wargear, does not count against the Battle Company’s roster limit,
            and cannot gain experience or be promoted. However, it must roll on
            the Warrior Injury Table as normal. Heroes may only have one Hunting
            Dog. */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small">
          Promote
        </Button>
        <Button variant="contained" size="small">
          Nothing
        </Button>
      </CardActions>
    </Card>
  );
}

TroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  troopData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles, { withTheme: true })(TroopCard);
