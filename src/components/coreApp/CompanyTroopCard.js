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

import UnitCharacteristics from "./UnitCharacteristics";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH, LIEUTNANT, SERGEANT } from "../../utils/Constants";

import { LieutnantIcon, SergeantIcon, WargearIcon } from "./../icons/CardIcons";
import { Grid, Grow, Avatar, IconButton, Tooltip, Chip } from "@material-ui/core";

import { calculatePoints } from "./../../utils/ArmyCalculations.js";

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

function CompanyTroopCard(props) {
  const { baseTroop, userTroop, classes, injured, forPreview = false, mobile } = props;
  const isDead = injured.indexOf(userTroop.access_name) !== -1 && !forPreview;

  const height = mobile ? undefined : "100%";

  return (
    <Grow in={true}>
      <Card
        style={isDead ? { height: height, opacity: 0.3, backgroundColor: "rgba(255, 255, 255, 0.2)" } : { height: height }}
        className={classes.card}
      >
        <CardActionArea>
          <CardMedia className={classes.media} image={userTroop.image_path} title={userTroop.name} />
        </CardActionArea>

        <CardContent>
          <Typography variant="h5" gutterBottom>
            {userTroop.troop_type === LIEUTNANT && (
              <Tooltip placement="top" title="Lieutnant">
                <span>
                  <IconButton disabled={isDead} className={classes.icons}>
                    <LieutnantIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {userTroop.troop_type === SERGEANT && (
              <Tooltip placement="top" title="Sergeant">
                <span>
                  <IconButton disabled={isDead} className={classes.icons}>
                    <SergeantIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {userTroop.troop_type !== LIEUTNANT && userTroop.troop_type !== SERGEANT && (
              <Tooltip placement="top" title="Warrior">
                <span>
                  <IconButton disabled={isDead} className={classes.icons}>
                    <WargearIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {userTroop.display_name}
          </Typography>

          <Grid container justify="space-evenly">
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography color="textSecondary" variant="button">
                    Points
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Avatar className={classes.statusAvatar}>{calculatePoints(baseTroop, userTroop)}</Avatar>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
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
            </Grid>
          </Grid>

          {!forPreview && (
            <UnitCharacteristics
              wargear={userTroop.wargear}
              baseWargear={baseTroop.base_wargear}
              improvs={userTroop.improvements}
              characs={baseTroop.characteristics}
            />
          )}

          <Typography color="textPrimary" variant="button">
            Wargear
          </Typography>
          <div className={classes.chipRoot}>
            {/* Basic wargear */}
            {userTroop.wargear
              .filter(weapon => baseTroop.base_wargear.indexOf(weapon) !== -1)
              .map((weapon, index) => (
                <Chip variant="outlined" key={index} label={weapon.replace(/_/g, " ")} className={classes.chip} />
              ))}
            {/* Optional wargear */}
            {userTroop.wargear
              .filter(weapon => !(baseTroop.base_wargear.indexOf(weapon) !== -1))
              .map((weapon, index) => (
                <Chip
                  variant={isDead ? "outlined" : "default"}
                  clickable={!isDead}
                  key={index}
                  label={weapon.replace(/_/g, " ")}
                  className={classes.chip}
                />
              ))}
          </div>

          <Typography color="textPrimary" variant="button">
            Description
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {baseTroop.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Button color="primary" variant="contained" disabled size="small">
            Promote
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );
}

CompanyTroopCard.defaultProps = {
  forPreview: false
};

CompanyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  userTroop: PropTypes.object.isRequired,
  baseTroop: PropTypes.object.isRequired,
  injured: PropTypes.array.isRequired,
  forPreview: PropTypes.bool.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(CompanyTroopCard);
