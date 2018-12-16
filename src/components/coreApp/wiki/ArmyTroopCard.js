import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import UnitCharacteristics from "./../UnitCharacteristics";

import { CARD_MAX_WIDTH, HERO } from "../../../utils/Constants";

import { LieutnantIcon, WargearIcon } from "./../../icons/CardIcons";
import { Grid, Avatar, IconButton, Tooltip, Chip } from "@material-ui/core";

import Thumbnailer from "./../../customs/Thumbnailer";

import { ARMY_TROOP_CARD_SWITCH } from "./../../../redux/reducers/ui";

const styles = theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      maxWidth: CARD_MAX_WIDTH
    }
  },
  icons: {
    padding: theme.spacing.unit * 0.8,
    marginRight: theme.spacing.unit,
    cursor: "initial",
    defaultColor: "black"
  },
  floatingTroopType: {
    width: 25,
    height: 25,
    boxShadow: "0px 3px 10px rgba(0,0,0,.6)"
  },
  statusAvatar: {
    marginTop: theme.spacing.unit,
    fontSize: 16,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.primary.light
  },
  statusAvatarMinimal: {
    boxShadow: "0px 3px 10px rgba(0,0,0,.6)",
    height: 18,
    fontSize: 10,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.paper : theme.palette.primary.light
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
  },
  troopTitle: {
    color: theme.palette.type === "dark" ? theme.palette.default : theme.palette.grey["600"]
  },
  troopTitleMinimal: {
    margin: theme.spacing.unit * 0.5,
    textAlign: "center",
    fontSize: 12,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  },
  pointsMinimal: {
    fontSize: "6px"
  }
});

const ArmyTroopCard = props => {
  const { baseTroop, classes, mobile } = props;

  const heightStyle = mobile ? undefined : { height: "100%" };

  const cardContent = (
    <>
      <CardContent>
        <Grid container alignItems="center" justify="space-evenly" spacing={16}>
          <Grid item>
            <Typography className={classes.troopTitle} variant="h5">
              {baseTroop.troop_type === HERO && (
                <Tooltip placement="top" title="Hero">
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
                      <WargearIcon fontSize={"small"} />
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
    </>
  );

  const floatingPoints = (
    <Typography className={classes.pointsMinimal} variant="subtitle2">
      <Chip className={classes.statusAvatarMinimal} label={baseTroop.points + " Pts"} />
    </Typography>
  );

  const floatingTroopType = (
    <>
      {baseTroop.troop_type === HERO && (
        <Avatar className={classes.floatingTroopType}>
          <LieutnantIcon style={{ fontSize: 10 }} />
        </Avatar>
      )}
      {baseTroop.troop_type !== HERO && (
        <Avatar className={classes.floatingTroopType}>
          <WargearIcon style={{ fontSize: 10 }} />
        </Avatar>
      )}
    </>
  );

  const minimalContent = (
    <Typography className={classes.troopTitleMinimal} variant="body2">
      {baseTroop.name}
    </Typography>
  );

  return (
    <Thumbnailer
      cardStyleOverride={heightStyle}
      cardMediaImagePath={baseTroop.image_path}
      minimalContent={minimalContent}
      cardContent={cardContent}
      floatLeftContent={floatingPoints}
      floatRightContent={floatingTroopType}
      mobile={mobile}
      switchID={ARMY_TROOP_CARD_SWITCH}
      timeout={props.timeout}
    />
  );
};

ArmyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  baseTroop: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(ArmyTroopCard);
