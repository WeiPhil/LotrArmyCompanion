import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Paper,
  withStyles,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  Chip,
  Avatar,
  DialogContent,
  CardContent
} from "@material-ui/core";

import { fetchUserCompanies, fetchArmies } from "../../redux/actions";
import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH } from "../../utils/Constants";
import { GoldSackIcon, VictoryIcon, DrawIcon, DeathIcon } from "../icons/OverviewIcons";
import MediaQuery from "react-responsive";

import { createCardData } from "../DataCreation";

import CompanyTroopCard from "./CompanyTroopCard";

const mapStateToProps = ({
  companiesData = {},
  armiesData = {},
  fetchError,
  isLoadingArmies,
  isLoadingCompanies,
  armiesNeedRefetch,
  companiesNeedRefetch
}) => ({
  companies: companiesData.companies,
  armies: armiesData,
  isLoadingCompanies,
  isLoadingArmies,
  armiesNeedRefetch,
  companiesNeedRefetch,
  fetchError
});

const styles = theme => ({
  card: {
    maxWidth: CARD_MAX_WIDTH * 1.5
  },
  cardContent: {
    padding: theme.spacing.unit * 2
  },
  companyTitle: {
    margin: theme.spacing.unit * 2,
    fontWeight: 400,
    color: theme.palette.primary.light
  },
  media: {
    height: CARD_IMAGE_HEIGHT
  },
  chip: {
    textTransform: "capitalize",
    margin: theme.spacing.unit * 0.5,
    fontSize: 10
  },
  statusAvatar: {
    marginTop: theme.spacing.unit,
    fontSize: 16,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.secondary.main
  },
  goldAvatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark
  },
  drawAvatar: {
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.background.paper
  },
  victoryAvatar: {
    backgroundColor: "#43A047",
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.background.paper
  },
  lossAvatar: {
    backgroundColor: "#BF360C",
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.background.paper
  },
  victoryPaper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.background.default
  },
  victoryPanelIcons: {
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : "black"
  }
});

class MyCompanies extends Component {
  state = {
    injuredOpen: false,
    injured: undefined
  };

  componentDidMount() {
    console.log("Company Information loading");
    if (this.props.companiesNeedRefetch) this.props.fetchUserCompanies();
    if (this.props.armiesNeedRefetch) this.props.fetchArmies();
  }

  handleInjuredClick = injured => {
    this.setState({ injuredOpen: true });
    this.setState({ injured: injured });
  };

  handleInjuredClose = () => {
    this.setState({ injuredOpen: false });
  };

  renderInjuredCard() {
    const injuredIndex = this.props.companies[0].access_map[this.state.injured];
    const { userTroop, baseTroop } = createCardData(
      this.props.companies[0].troops[injuredIndex],
      true,
      this.props.companies[0].faction_access_name,
      this.props.armies
    );

    return <CompanyTroopCard forPreview injured={this.props.companies[0].injured} userTroop={userTroop} baseTroop={baseTroop} />;
  }

  render() {
    const { isLoadingArmies, isLoadingCompanies, fetchError, companies, classes } = this.props;
    const company = companies !== undefined && companies[0];
    return (
      <>
        {isLoadingArmies || isLoadingCompanies || fetchError ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <Grid container justify="center">
            <Grid item>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={require("./../../assets/images/" + company.image_path)}
                    title={company.company_access_name}
                  />
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Grid container direction="column" alignItems="stretch" spacing={8}>
                    <Grid item>
                      <Typography variant="h4" className={classes.companyTitle}>
                        {company.company_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" justify="space-evenly">
                        <Grid item>
                          <Grid container direction="column" alignItems="center">
                            <Grid item>
                              <Typography color="textSecondary" variant="button">
                                Company Rating
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                <Avatar className={classes.statusAvatar}>{company.company_rating}</Avatar>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column" alignItems="center">
                            <Grid item>
                              <Typography color="textSecondary" variant="button">
                                Effective Rating
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                <Avatar className={classes.statusAvatar}>{company.effective_rating}</Avatar>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.victoryPaper}>
                        <Grid container direction="row" justify="space-evenly" spacing={8}>
                          <Grid item>
                            <Grid container direction="column" alignItems="center" spacing={8}>
                              <Grid item>
                                <VictoryIcon className={classes.victoryPanelIcons} />
                              </Grid>
                              <Grid item>
                                <Chip avatar={<Avatar className={classes.victoryAvatar}>V</Avatar>} label={company.victories} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container direction="column" alignItems="center" spacing={8}>
                              <Grid item>
                                <DrawIcon className={classes.victoryPanelIcons} />
                              </Grid>
                              <Grid item>
                                <Chip avatar={<Avatar className={classes.drawAvatar}>D</Avatar>} label={company.draws} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container direction="column" alignItems="center" spacing={8}>
                              <Grid item>
                                <DeathIcon className={classes.victoryPanelIcons} />
                              </Grid>
                              <Grid item>
                                <Chip avatar={<Avatar className={classes.lossAvatar}>L</Avatar>} label={company.losses} />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item>
                          <Chip
                            avatar={
                              <Avatar className={classes.goldAvatar}>
                                <GoldSackIcon />
                              </Avatar>
                            }
                            label={company.gold + " Gold"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="button">Injured</Typography>
                        </Grid>
                        <Grid item>
                          {company.injured.map((injured, index) => (
                            <Chip
                              clickable
                              onClick={() => this.handleInjuredClick(injured)}
                              key={index}
                              label={injured.replace(/_/g, " ")}
                              className={classes.chip}
                            />
                          ))}
                          <MediaQuery query="(min-height: 600px)">
                            <Dialog open={this.state.injuredOpen} keepMounted onClose={this.handleInjuredClose}>
                              <DialogContent style={{ padding: 0, margin: "0 auto" }}>
                                {this.state.injured !== undefined && this.renderInjuredCard()}
                              </DialogContent>
                            </Dialog>
                          </MediaQuery>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { fetchUserCompanies, fetchArmies }
  )(MyCompanies)
);
