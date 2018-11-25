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

import TroopCharacteristics from "./TroopCharacteristics";

import { CARD_MAX_WIDTH } from "./../../utils/Constants";
import { CARD_IMAGE_HEIGHT } from "./../../utils/Constants";

const styles = {
  card: {
    maxWidth: CARD_MAX_WIDTH
  },
  media: {
    height: CARD_IMAGE_HEIGHT
  }
};

var makeRequest = function() {
  fetch("http://localhost:5000/getJson").then(response => {
    var temp = response.json();
    console.log(temp);
  });
};

function TroopCard(props) {
  const { cardImagePath, classes } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={cardImagePath}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Hunting Dog
          </Typography>
          <TroopCharacteristics />
          <Typography component="p">
            Many Heroes have trained companion animals that accompany them on
            their campaigns. A hunting dog is considered part of the Hero’s
            wargear, does not count against the Battle Company’s roster limit,
            and cannot gain experience or be promoted. However, it must roll on
            the Warrior Injury Table as normal. Heroes may only have one Hunting
            Dog.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={makeRequest}>
          GET JSON
        </Button>
        <Button size="small" color="primary">
          Nothing
        </Button>
      </CardActions>
    </Card>
  );
}

TroopCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TroopCard);
