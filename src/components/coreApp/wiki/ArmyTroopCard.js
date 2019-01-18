import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import UnitCharacteristics from "./../UnitCharacteristics";

import { CARD_MAX_WIDTH } from "../../../utils/Constants";

import { LieutenantIcon, WargearIcon } from "./../../icons/CardIcons";
import { Grid, Avatar, IconButton, Tooltip, Chip, Divider } from "@material-ui/core";

import Thumbnailer from "./../../customs/Thumbnailer";

import { ARMY_TROOP_CARD_SWITCH } from "./../../../redux/reducers/ui";
import { prettify } from "./../../../utils/Functions";

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
  thumbnailTroopType: {
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
  const { unit, classes, mobile } = props;

  const heightStyle = mobile ? undefined : { height: "100%" };

  const isHero = unit.keywords.filter(keyword => keyword.includes("hero")).length > 0;
  const heroRank = isHero ? prettify(unit.keywords.filter(keyword => keyword.includes("hero"))[0]) : "Warrior";

  const cardContent = (
    <>
      <CardContent>
        {/* Rank, Title , Points Grid  */}
        <Grid container alignItems="center" justify="space-evenly" spacing={8}>
          <Grid item xs={2}>
            <Tooltip placement="top" title={heroRank}>
              <span>
                <IconButton className={classes.icons}>{isHero ? <LieutenantIcon /> : <WargearIcon />}</IconButton>
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.troopTitle} variant="h6">
              {prettify(unit.name)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography color="textSecondary" variant="button">
                  Points
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="subtitle2">
                  <Avatar className={classes.statusAvatar}>{unit.points}</Avatar>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}

        <Divider style={{ marginTop: 20 }} />
        <UnitCharacteristics characs={unit.characteristics} />

        {(unit.base_wargear.length !== 0 || unit.optional_wargear.length !== 0) && (
          <>
            <Typography color="textPrimary" variant="button">
              Wargear
            </Typography>
            <div className={classes.chipRoot}>
              {/* Basic wargear */}
              {unit.base_wargear.map((weapon, index) => (
                <Chip variant="outlined" key={index} label={prettify(weapon)} className={classes.chip} />
              ))}
              {/* Optional wargear */}
              {unit.optional_wargear.map((weapon, index) => (
                <Chip variant={"default"} clickable key={index} label={prettify(weapon)} className={classes.chip} />
              ))}
            </div>
          </>
        )}
        {unit.special_rules.length !== 0 && (
          <>
            <Typography color="textPrimary" variant="button">
              Special Rules
            </Typography>
            <div className={classes.chipRoot}>
              {/* Special Rules */}
              {unit.special_rules.map((rule, index) => (
                <Chip variant="outlined" key={index} label={prettify(rule["name"])} className={classes.chip} />
              ))}
            </div>
          </>
        )}

        {unit.description.length !== 0 && (
          <>
            <Typography color="textPrimary" variant="button">
              Description
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {unit.description}
            </Typography>
          </>
        )}
      </CardContent>
    </>
  );

  const floatingPoints = (
    <Typography className={classes.pointsMinimal} variant="subtitle2">
      <Chip className={classes.statusAvatarMinimal} label={unit.points + " Pts"} />
    </Typography>
  );

  const thumbnailTroopType = (
    <Avatar className={classes.thumbnailTroopType}>
      {isHero ? <LieutenantIcon style={{ fontSize: 10 }} /> : <WargearIcon style={{ fontSize: 10 }} />}
    </Avatar>
  );
  const minimalContent = (
    <Typography noWrap className={classes.troopTitleMinimal} variant="body2">
      {prettify(unit.name)}
    </Typography>
  );

  return (
    <Thumbnailer
      additionalCardStyle={heightStyle}
      cardMediaImagePath={require("./../../../assets/images/" + unit.image_path)}
      minimalContent={minimalContent}
      cardContent={cardContent}
      floatLeftContent={floatingPoints}
      floatRightContent={thumbnailTroopType}
      mobile={mobile}
      switchID={ARMY_TROOP_CARD_SWITCH}
      timeout={props.timeout}
    />
  );
};

ArmyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(ArmyTroopCard);
