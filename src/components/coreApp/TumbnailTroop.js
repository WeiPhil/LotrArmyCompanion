import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles, Card, CardMedia, CardActionArea, Typography, Drawer, Button, Collapse } from "@material-ui/core";

import { TUMBNAIL_IMAGE_SIZE } from "../../utils/Constants";

import { prettify } from "./../../utils/Functions";

import ArmyTroopCard from "./wiki/ArmyTroopCard";

const styles = theme => ({
  card: {
    // [theme.breakpoints.up("md")]: {
    // maxWidth: TUMBNAIL_IMAGE_SIZE
    // maxHeight: CARD_IMAGE_HEIGHT
    // }
  },
  media: {
    width: TUMBNAIL_IMAGE_SIZE,
    height: TUMBNAIL_IMAGE_SIZE * 0.5
  },
  troopName: {
    margin: theme.spacing.unit * 2,
    fontWeight: 450,
    color: theme.palette.type === "dark" ? theme.palette.grey["500"] : theme.palette.grey["600"]
  },
  troopNameSubtitle: {
    margin: theme.spacing.unit * 2,
    fontWeight: 400,
    color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.grey["600"]
  }
});

class TumbnailTroop extends Component {
  state = {
    drawerOpen: false
  };
  render() {
    const { classes, troopName, baseTroop, mobile } = this.props;

    const imagePath = "misty_mountains.jpg";

    const stringL =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus egestas tellus, vel ultrices tellus ultricies non. Nulla vitae ligula at tortor consequat suscipit. Integer at diam facilisis, vulputate nulla vel, volutpat urna. Maecenas nec massa a ex lacinia semper ac quis ante. Curabitur feugiat elit vel nunc pharetra, ut suscipit ex sodales. Donec vehicula viverra volutpat. Pellentesque risus sem, finibus a aliquet in, porta sed tortor. In porttitor lorem a sagittis convallis. Sed facilisis pellentesque lorem, at accumsan orci interdum in. Donec molestie pulvinar quam, eget faucibus mi commodo et. Nulla suscipit bibendum risus id dapibus.    Proin ut tortor congue, semper leo in, cursus eros. Praesent dolor ligula, accumsan vel fermentum nec, convallis luctus nunc. Maecenas eget augue ante. Vestibulum gravida neque magna, vel finibus turpis commodo sed. Etiam euismod ut enim at auctor. Proin sodales ultrices ornare. Nulla id mollis metus. Praesent at porttitor libero. Mauris vitae pharetra tellus, at fermentum eros. Maecenas sem est, suscipit in luctus in, pretium ac erat. Mauris posuere nec metus vel porta. Vestibulum eleifend faucibus odio. Nulla maximus fringilla justo ut feugiat. Vivamus tincidunt elit ut turpis pretium lobortis. Maecenas eu facilisis ipsum, in rutrum ipsum. Duis eget ultrices tortor.    Vestibulum lacinia venenatis posuere. Praesent eleifend ultrices tincidunt. Fusce sagittis, ligula ullamcorper consequat tincidunt, odio erat viverra ex, vitae placerat ligula nunc in nisl. Pellentesque sit amet feugiat lectus, sit amet pellentesque elit. Sed rutrum commodo nisi, vitae consequat ex blandit in. Nulla nulla felis, convallis et lectus faucibus, vehicula aliquam massa. Nullam eget eros in tellus faucibus eleifend. In hac habitasse platea dictumst. Maecenas posuere vehicula tincidunt. Proin venenatis nisi nisl, ac malesuada justo sagittis non. Quisque odio sem, bibendum non urna at, scelerisque semper ante. Aliquam sed justo sollicitudin, convallis leo at, laoreet ante. Aliquam erat volutpat.    Aliquam vel molestie tortor, at rutrum sem. Proin luctus augue metus, ut sodales erat viverra nec. Nam varius pellentesque tortor at tempor. Morbi aliquam interdum ante a tempus. Donec in ultricies tortor. Aenean ut risus id neque pellentesque congue a in est. Phasellus porttitor, leo id mollis pretium, ante velit rhoncus enim, vel egestas orci nisi vel justo. Donec sit amet massa commodo, tincidunt urna ut, consectetur dolor. Ut blandit hendrerit placerat. In vel ex semper, blandit enim nec, feugiat magna. Cras id ultricies metus, consectetur varius nulla. Proin vel magna convallis, lobortis nulla quis, fermentum dui. Praesent feugiat ipsum et ex tincidunt imperdiet. In ut lectus id odio maximus convallis eu non ligula. Aenean venenatis sagittis sodales.";

    return (
      <>
        <Card className={classes.card}>
          <CardActionArea onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>
            <CardMedia className={classes.media} image={require("./../../assets/images/" + imagePath)} />
            <Typography variant="body2" className={classes.troopName}>
              {prettify(troopName)}
            </Typography>

            <Collapse in={this.state.drawerOpen}>
              {this.state.drawerOpen && <ArmyTroopCard baseTroop={baseTroop} mobile={mobile} />}
              {/* <Typography variant="body2" className={classes.troopName}>
                {prettify(troopName)}
                {this.state.drawerOpen && <p>{stringL}</p>}
              </Typography> */}
            </Collapse>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

TumbnailTroop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TumbnailTroop);
