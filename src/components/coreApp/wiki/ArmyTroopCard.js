import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import UnitCharacteristics from "./../UnitCharacteristics";

import { TUMBNAIL_IMAGE_SIZE, CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH, HERO } from "../../../utils/Constants";

import { LieutnantIcon, WargearIcon } from "./../../icons/CardIcons";
import { Grid, Grow, Avatar, IconButton, Tooltip, Chip, Collapse } from "@material-ui/core";

import { connect } from "react-redux";
import { armyTroopCardExpandClick } from "./../../../redux/actions/ui";

const styles = theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      maxWidth: CARD_MAX_WIDTH
    }
  },
  cardContentMinimal: {
    padding: theme.spacing.unit,
    paddingBottom: 0
  },
  mediaExpanded: {
    height: CARD_IMAGE_HEIGHT
  },
  media: {
    minWidth: TUMBNAIL_IMAGE_SIZE,
    width: "100%",
    height: TUMBNAIL_IMAGE_SIZE * 0.5
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
    fontSize: 12,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  },
  troopName: {
    margin: theme.spacing.unit * 2,
    fontWeight: 450,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  },
  pointsMinimal: {
    fontSize: "6px"
  }
});

const mapStateToProps = ({ ui }) => ({
  troopCardSwitch: ui.troopCardSwitch
});

class ArmyTroopCard extends Component {
  state = {
    detailsOpen: !this.props.mobile,
    collapseOpen: !this.props.mobile,
    drawerJustClicked: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.mobile) {
      if (prevProps.troopCardSwitch !== this.props.troopCardSwitch && !this.state.drawerJustClicked) {
        if (this.state.detailsOpen === true) this.setState(() => ({ detailsOpen: false }));
      } else if (prevState.drawerJustClicked !== this.state.drawerJustClicked && this.state.drawerJustClicked === true) {
        this.setState(state => ({ drawerJustClicked: false, detailsOpen: !state.detailsOpen }));
      }
      if (prevState.detailsOpen !== this.state.detailsOpen) {
        if (this.state.detailsOpen) {
          this.setState(() => ({ collapseOpen: true }));
        } else {
          this.setState(() => ({ collapseOpen: false }));
        }
      }
    }
  }

  handleExpandClick = () => {
    this.setState(() => ({ drawerJustClicked: true }));
    this.props.armyTroopCardExpandClick();
  };

  render() {
    const { baseTroop, classes, mobile } = this.props;

    const height = mobile ? undefined : "100%";

    const expandedCardContent = (
      <>
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
      </>
    );

    const floatingPoints = (
      <Typography className={!this.state.detailsOpen ? classes.pointsMinimal : undefined} variant="subtitle2">
        <Chip className={classes.statusAvatarMinimal} label={baseTroop.points + " Pts"} />
      </Typography>
    );

    const floatingTroopType = (baseTroop.troop_type === HERO && (
      <Avatar className={classes.floatingTroopType}>
        <LieutnantIcon style={{ fontSize: 10 }} />
      </Avatar>
    ),
    baseTroop.troop_type !== HERO && (
      <Avatar className={classes.floatingTroopType}>
        <WargearIcon style={{ fontSize: 10 }} />
      </Avatar>
    ));

    return (
      <Grow in={true}>
        <div style={{ height: height }}>
          <Card style={{ height: height }} className={classes.card}>
            <CardActionArea onClick={this.handleExpandClick}>
              <CardMedia
                className={this.state.detailsOpen ? classes.mediaExpanded : classes.media}
                image={baseTroop.image_path}
                title={baseTroop.name}
              />
            </CardActionArea>

            <CardContent
              style={!this.state.detailsOpen ? { paddingBottom: 8 } : undefined}
              className={this.state.detailsOpen ? undefined : classes.cardContentMinimal}
            >
              <Grid container alignItems="center" justify="space-evenly" spacing={16}>
                <Grid item>
                  <Typography
                    className={this.state.detailsOpen ? classes.troopTitle : classes.troopTitleMinimal}
                    variant={this.state.detailsOpen ? "h5" : "body2"}
                  >
                    {this.state.detailsOpen && baseTroop.troop_type === HERO && (
                      <Tooltip placement="top" title="Lieutnant">
                        <span>
                          <IconButton className={classes.icons}>
                            <LieutnantIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    {this.state.detailsOpen && baseTroop.troop_type !== HERO && (
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
                {this.state.detailsOpen && (
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography color="textSecondary" variant="button">
                          Points
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography className={!this.state.detailsOpen ? classes.pointsMinimal : undefined} variant="subtitle2">
                          <Avatar className={this.state.detailsOpen ? classes.statusAvatar : classes.statusAvatarMinimal}>
                            {baseTroop.points}
                          </Avatar>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {!this.props.mobile ? (
                expandedCardContent
              ) : (
                <Collapse in={this.state.detailsOpen}>
                  {/* small hack using another boolean that is set once we close it to have a smooth collapse closing */}
                  <div>{this.state.collapseOpen && expandedCardContent}</div>
                </Collapse>
              )}
              {/* {this.state.detailsOpen && ( */}

              {/* )} */}
            </CardContent>
          </Card>
          {!this.state.detailsOpen && [
            <div
              key={"floatPoints"}
              style={{
                zIndex: 10000,
                position: "fixed",
                top: -5,
                right: -5
              }}
            >
              {floatingPoints}
            </div>,
            <div
              key={"floatType"}
              style={{
                zIndex: 10000,
                position: "fixed",
                top: -5,
                left: -5
              }}
            >
              {floatingTroopType}
            </div>
          ]}
        </div>
      </Grow>
    );
  }
}

ArmyTroopCard.defaultProps = {
  forPreview: false
};

ArmyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  baseTroop: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { armyTroopCardExpandClick }
)(withStyles(styles, { withTheme: true })(ArmyTroopCard));
