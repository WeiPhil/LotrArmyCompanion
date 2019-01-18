import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TableBody, TableCell, TableRow, TableHead, Table, Paper } from "@material-ui/core";

import { WEAPON_BONUSES } from "./../../utils/Constants";

import { extraPalette } from "./../../utils/UIColors";

const CustomTableHeader = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 1.4,
    paddingRight: 0,
    fontSize: 14,
    color: theme.palette.type === "dark" ? theme.palette.button : theme.palette.background.default
  }
}))(TableCell);

const CustomTableCell = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 1.4,
    paddingRight: 0,
    fontSize: 14,
    color: theme.palette.type === "dark" ? theme.palette.button : "black"
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto",
    marginBottom: theme.spacing.unit * 2
  },
  head: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.secondary.dark : theme.palette.secondary.main
  },
  bonusTypography: {
    color: theme.palette.type === "dark" ? extraPalette.dark.bonus.light : extraPalette.light.bonus.dark
  },
  malusTypography: {
    color: theme.palette.type === "dark" ? extraPalette.dark.malus.light : extraPalette.light.malus.dark
  }
});

class UnitCharacteristics extends Component {
  getCharacteristicFor(charac, improv, add = "") {
    return improv > 0 ? (
      <Typography className={this.props.classes.bonusTypography} style={{ display: "inline-block" }}>
        {charac + improv}
      </Typography>
    ) : (
      <Typography style={{ display: "inline-block" }}>{charac + improv + add}</Typography>
    );
  }

  createDataUser(improvs, characs, wargear, baseWargear) {
    var bonus = { move: 0, fight: 0, shoot: 0, strength: 0, defence: 0, attacks: 0, wounds: 0, courage: 0, might: 0, will: 0, fate: 0 };

    wargear
      .filter(weapon => baseWargear.indexOf(weapon) === -1 && weapon in WEAPON_BONUSES)
      .map(weapon => {
        const ameliorations = WEAPON_BONUSES[weapon];
        for (var key in ameliorations) {
          if (ameliorations.hasOwnProperty(key)) {
            bonus[key] += ameliorations[key];
          }
        }
        return null; //does not return anything
      });

    return {
      move: this.getCharacteristicFor(characs.move, improvs.move + bonus.move, '"'),
      fight: this.getCharacteristicFor(characs.fight, improvs.fight + bonus.fight),
      shoot: this.getCharacteristicFor(characs.shoot, improvs.shoot + bonus.shoot, "+"),
      strength: this.getCharacteristicFor(characs.strength, improvs.strength + bonus.strength),
      defence: this.getCharacteristicFor(characs.defence, improvs.defence + bonus.defence),
      attacks: this.getCharacteristicFor(characs.attacks, improvs.attacks + bonus.attacks),
      wounds: this.getCharacteristicFor(characs.wounds, improvs.wounds + bonus.wounds),
      courage: this.getCharacteristicFor(characs.courage, improvs.courage + bonus.courage),
      might: this.getCharacteristicFor(characs.might, improvs.might + bonus.might),
      will: this.getCharacteristicFor(characs.will, improvs.will + bonus.will),
      fate: this.getCharacteristicFor(characs.fate, improvs.fate + bonus.fate)
    };
  }

  createDataBase(characs) {
    return {
      move: characs.move + '"',
      fight: characs.fight,
      shoot: characs.shoot + "+",
      strength: characs.strength,
      defence: characs.defence,
      attacks: characs.attacks,
      wounds: characs.wounds,
      courage: characs.courage,
      might: characs.might,
      will: characs.will,
      fate: characs.fate
    };
  }

  render() {
    const { improvs, characs, classes, wargear, baseWargear } = this.props;

    const forunit = improvs === undefined;

    const characteristics = forunit ? this.createDataBase(characs) : this.createDataUser(improvs, characs, wargear, baseWargear);

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              <CustomTableHeader>Move</CustomTableHeader>
              <CustomTableHeader>F/S+</CustomTableHeader>
              <CustomTableHeader>S</CustomTableHeader>
              <CustomTableHeader>D</CustomTableHeader>
              <CustomTableHeader>A</CustomTableHeader>
              <CustomTableHeader>W</CustomTableHeader>
              <CustomTableHeader>C</CustomTableHeader>
              <CustomTableHeader>M/W/F</CustomTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CustomTableCell component="th" scope="row">
                {characteristics.move}
              </CustomTableCell>
              <CustomTableCell>
                {characteristics.fight}/{characteristics.shoot}
              </CustomTableCell>
              <CustomTableCell>{characteristics.strength}</CustomTableCell>
              <CustomTableCell>{characteristics.defence}</CustomTableCell>
              <CustomTableCell>{characteristics.attacks}</CustomTableCell>
              <CustomTableCell>{characteristics.wounds}</CustomTableCell>
              <CustomTableCell>{characteristics.courage}</CustomTableCell>
              <CustomTableCell>
                {characteristics.might}/{characteristics.will}/{characteristics.fate}
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UnitCharacteristics.propTypes = {
  classes: PropTypes.object.isRequired,
  characs: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles, { withTheme: true })(UnitCharacteristics);
