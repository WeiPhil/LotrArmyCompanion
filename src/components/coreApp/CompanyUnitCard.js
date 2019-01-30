import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import UnitCharacteristics from "./UnitCharacteristics";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH, LIEUTENANT, SERGEANT } from "../../utils/Constants";

import { LieutenantIcon, SergeantIcon, WargearIcon } from "../icons/CardIcons";
import { Grid, Avatar, IconButton, Tooltip, Chip } from "@material-ui/core";

import Thumbnailer from "../customs/Thumbnailer";

import { COMPANY_TROOP_CARD_SWITCH } from "../../redux/reducers/ui";

import { prettify } from "../../utils/Functions";

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
  companyUnitTitleMinimal: {
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

function CompanyUnitCard(props) {
  const { company_unit, classes, forPreview = false, mobile } = props;
  const isDead = props.isDead && !forPreview;

  const height = mobile ? undefined : "100%";

  const floatingPoints = (
    <Typography className={classes.pointsMinimal} variant="subtitle2">
      <Chip className={classes.statusAvatarMinimal} label={company_unit.effective_points + " Pts"} />
    </Typography>
  );

  const floatingTroopType = (
    <>
      {company_unit.company_unit_rank === LIEUTENANT && (
        <Avatar key={LIEUTENANT} className={classes.floatingTroopType}>
          <LieutenantIcon style={{ fontSize: 14 }} />
        </Avatar>
      )}
      {company_unit.company_unit_rank === SERGEANT && (
        <Avatar key={SERGEANT} className={classes.floatingTroopType}>
          <SergeantIcon style={{ fontSize: 14 }} />
        </Avatar>
      )}
      {company_unit.company_unit_rank !== LIEUTENANT && company_unit.company_unit_rank !== SERGEANT && (
        <Avatar key={"warrior"} className={classes.floatingTroopType}>
          <WargearIcon style={{ fontSize: 14 }} />
        </Avatar>
      )}
    </>
  );

  const minimalContent = (
    <Typography noWrap className={classes.companyUnitTitleMinimal} variant="body2">
      {company_unit.company_unit_name}
    </Typography>
  );

  const cardContent = (
    <>
      <CardContent style={isDead ? { opacity: 0.5 } : undefined}>
        <Typography variant="h5" gutterBottom>
          {company_unit.company_unit_rank === LIEUTENANT && (
            <Tooltip placement="top" title="Lieutenant">
              <span>
                <IconButton disabled={isDead} className={classes.icons}>
                  <LieutenantIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {company_unit.company_unit_rank === SERGEANT && (
            <Tooltip placement="top" title="Sergeant">
              <span>
                <IconButton disabled={isDead} className={classes.icons}>
                  <SergeantIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {company_unit.company_unit_rank !== LIEUTENANT && company_unit.company_unit_rank !== SERGEANT && (
            <Tooltip placement="top" title="Warrior">
              <span>
                <IconButton disabled={isDead} className={classes.icons}>
                  <WargearIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {company_unit.company_unit_name}
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
                  <Avatar className={classes.statusAvatar}>{company_unit.effective_points}</Avatar>
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

        {!forPreview && <UnitCharacteristics characteristics={company_unit.characteristics} />}

        <Typography color="textPrimary" variant="button">
          Wargear
        </Typography>
        <div className={classes.chipRoot}>
          {/* Basic wargear */}
          {company_unit.wargear
            .filter(equipement => equipement.points === 0)
            .map((equipement, index) => (
              <Chip variant="outlined" key={index} label={prettify(equipement.name)} className={classes.chip} />
            ))}
          {/* Optional wargear */}
          {company_unit.wargear
            .filter(equipement => equipement.points > 0)
            .map((equipement, index) => (
              <Chip variant={isDead ? "outlined" : "default"} clickable={!isDead} key={index} label={prettify(equipement.name)} className={classes.chip} />
            ))}
        </div>

        <Typography color="textPrimary" variant="button">
          Notes
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {company_unit.notes === null ? "No notes for now" : company_unit.notes}
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
      additionalCardActionAreaStyle={isDead ? { opacity: 0.5 } : undefined}
      additionalCardStyle={{ height: height }}
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

CompanyUnitCard.defaultProps = {
  forPreview: false
};

CompanyUnitCard.propTypes = {
  classes: PropTypes.object.isRequired,
  company_unit: PropTypes.object.isRequired,
  forPreview: PropTypes.bool.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(CompanyUnitCard);
