import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import UnitCharacteristics from "./../UnitCharacteristics";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH, HERO } from "../../../utils/Constants";

import { LieutnantIcon, WargearIcon } from "./../../icons/CardIcons";
import { Grid, Grow, Avatar, IconButton, Tooltip, Chip } from "@material-ui/core";

const styles = theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      maxWidth: CARD_MAX_WIDTH
    }
  },
  media: {
    height: CARD_IMAGE_HEIGHT
  },
  icons: {
    padding: theme.spacing.unit * 0.8,
    marginRight: theme.spacing.unit,
    cursor: "initial",
    defaultColor: "black"
  },
  statusAvatar: {
    marginTop: theme.spacing.unit,
    fontSize: 16,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.primary.light
  },
  chipRoot: {
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    textTransform: "capitalize",
    margin: theme.spacing.unit * 0.5,
    fontSize: 10
  }
});

function ArmyTroopCard(props) {
  const { baseTroop, classes, mobile } = props;

  const height = mobile ? undefined : "100%";

  return (
    <Grow in={true}>
      <Card style={{ height: height }} className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={baseTroop.image_path} title={baseTroop.name} />
        </CardActionArea>

        <CardContent>
          <Grid container alignItems="center" justify="space-evenly" spacing={16}>
            <Grid item>
              <Typography variant="h5">
                {baseTroop.troop_type === HERO && (
                  <Tooltip placement="top" title="Lieutnant">
                    <span>
                      <IconButton className={classes.icons}>
                        <LieutnantIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {baseTroop.troop_type !== HERO && (
                  <Tooltip placement="top" title="Warrior">
                    <span>
                      <IconButton className={classes.icons}>
                        <WargearIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {baseTroop.name}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography color="textSecondary" variant="button">
                    Points
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Avatar className={classes.statusAvatar}>{baseTroop.points}</Avatar>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography color="textSecondary" variant="button">
                    Experience
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Avatar className={classes.statusAvatar}>{userTroop.experience}</Avatar>
                  </Typography>
                </Grid> 
              </Grid> 
            </Grid>*/}
          </Grid>

          <UnitCharacteristics characs={baseTroop.characteristics} />

          <Typography color="textPrimary" variant="button">
            Wargear
          </Typography>
          <div className={classes.chipRoot}>
            {/* Basic wargear */}
            {baseTroop.base_wargear.map((weapon, index) => (
              <Chip variant="outlined" key={index} label={weapon.replace(/_/g, " ")} className={classes.chip} />
            ))}
            {/* Optional wargear */}
            {baseTroop.optional_wargear.map((weapon, index) => (
              <Chip variant={"default"} clickable key={index} label={weapon.replace(/_/g, " ")} className={classes.chip} />
            ))}
          </div>

          <Typography color="textPrimary" variant="button">
            Special Rules
          </Typography>
          <div className={classes.chipRoot}>
            {/* Special Rules */}
            {baseTroop.special_rules.map((rule, index) => (
              <Chip variant="outlined" key={index} label={rule.replace(/_/g, " ")} className={classes.chip} />
            ))}
          </div>

          <Typography color="textPrimary" variant="button">
            Description
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {baseTroop.description}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
}

ArmyTroopCard.defaultProps = {
  forPreview: false
};

ArmyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  baseTroop: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(ArmyTroopCard);
