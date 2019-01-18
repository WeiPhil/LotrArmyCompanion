import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import UnitCharacteristics from "./UnitCharacteristics";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH, LIEUTENANT, SERGEANT } from "../../utils/Constants";

import { LieutenantIcon, SergeantIcon, WargearIcon } from "./../icons/CardIcons";
import { Grid, Avatar, IconButton, Tooltip, Chip } from "@material-ui/core";

import { calculatePoints } from "./../../utils/ArmyCalculations.js";

import Thumbnailer from "./../customs/Thumbnailer";

import { COMPANY_TROOP_CARD_SWITCH } from "./../../redux/reducers/ui";

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
  },
  troopTitleMinimal: {
    margin: theme.spacing.unit * 0.5,
    textAlign: "center",
    fontSize: 12,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  },
  pointsMinimal: {
    fontSize: "6px"
  },
  statusAvatarMinimal: {
    boxShadow: "0px 3px 10px rgba(0,0,0,.6)",
    height: 18,
    fontSize: 10,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.paper : theme.palette.primary.light
  },
  floatingTroopType: {
    width: 25,
    height: 25,
    boxShadow: "0px 3px 10px rgba(0,0,0,.6)"
  }
});

function CompanyTroopCard(props) {
  const { unit, company_unit, classes, injured, forPreview = false, mobile } = props;
  const isDead = injured.indexOf(company_unit.access_name) !== -1 && !forPreview;

  const height = mobile ? undefined : "100%";

  const calculatedPoints = calculatePoints(unit, company_unit);

  const floatingPoints = (
    <Typography className={classes.pointsMinimal} variant="subtitle2">
      <Chip className={classes.statusAvatarMinimal} label={calculatedPoints + " Pts"} />
    </Typography>
  );

  const floatingTroopType = (
    <>
      {company_unit.troop_type === LIEUTENANT && (
        <Avatar key={LIEUTENANT} className={classes.floatingTroopType}>
          <LieutenantIcon style={{ fontSize: 14 }} />
        </Avatar>
      )}
      {company_unit.troop_type === SERGEANT && (
        <Avatar key={SERGEANT} className={classes.floatingTroopType}>
          <SergeantIcon style={{ fontSize: 14 }} />
        </Avatar>
      )}
      {company_unit.troop_type !== LIEUTENANT && company_unit.troop_type !== SERGEANT && (
        <Avatar key={"warrior"} className={classes.floatingTroopType}>
          <WargearIcon style={{ fontSize: 14 }} />
        </Avatar>
      )}
    </>
  );

  const minimalContent = (
    <Typography noWrap className={classes.troopTitleMinimal} variant="body2">
      {company_unit.display_name}
    </Typography>
  );

  const cardContent = (
    <>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {company_unit.troop_type === LIEUTENANT && (
            <Tooltip placement="top" title="Lieutenant">
              <span>
                <IconButton disabled={isDead} className={classes.icons}>
                  <LieutenantIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {company_unit.troop_type === SERGEANT && (
            <Tooltip placement="top" title="Sergeant">
              <span>
                <IconButton disabled={isDead} className={classes.icons}>
                  <SergeantIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {company_unit.troop_type !== LIEUTENANT && company_unit.troop_type !== SERGEANT && (
            <Tooltip placement="top" title="Warrior">
              <span>
                <IconButton disabled={isDead} className={classes.icons}>
                  <WargearIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {company_unit.display_name}
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
                  <Avatar className={classes.statusAvatar}>{calculatedPoints}</Avatar>
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
                  <Avatar className={classes.statusAvatar}>{company_unit.experience}</Avatar>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {!forPreview && (
          <UnitCharacteristics
            wargear={company_unit.wargear}
            baseWargear={unit.base_wargear}
            improvs={company_unit.improvements}
            characs={unit.characteristics}
          />
        )}

        <Typography color="textPrimary" variant="button">
          Wargear
        </Typography>
        <div className={classes.chipRoot}>
          {/* Basic wargear */}
          {company_unit.wargear
            .filter(weapon => unit.base_wargear.indexOf(weapon) !== -1)
            .map((weapon, index) => (
              <Chip variant="outlined" key={index} label={weapon.replace(/_/g, " ")} className={classes.chip} />
            ))}
          {/* Optional wargear */}
          {company_unit.wargear
            .filter(weapon => !(unit.base_wargear.indexOf(weapon) !== -1))
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
          {unit.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" disabled size="small">
          Promote
        </Button>
      </CardActions>
    </>
  );

  return (
    <Thumbnailer
      additionalCardStyle={isDead ? { height: height, opacity: 0.6, backgroundColor: "rgba(255, 255, 255, 0.2)" } : { height: height }}
      cardMediaImagePath={require("./../../assets/images/" + company_unit.image_path)}
      minimalContent={minimalContent}
      cardContent={cardContent}
      floatLeftContent={floatingPoints}
      floatRightContent={floatingTroopType}
      mobile={!forPreview && mobile}
      switchID={COMPANY_TROOP_CARD_SWITCH}
      timeout={props.timeout}
    />
  );
}

CompanyTroopCard.defaultProps = {
  forPreview: false
};

CompanyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  company_unit: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
  injured: PropTypes.array.isRequired,
  forPreview: PropTypes.bool.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(CompanyTroopCard);
