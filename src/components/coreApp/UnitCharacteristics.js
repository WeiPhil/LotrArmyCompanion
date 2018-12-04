import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import { WEAPON_BONUSES } from "./../../utils/Constants";

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
    color: theme.palette.type === "dark" ? theme.palette.button : theme.palette.secondary.main
  }
}))(TableCell);

function getCharacteristicFor(charac, improv, add = "") {
  return improv > 0 ? (
    <Typography style={{ display: "inline-block" }} color="error">
      {charac + improv}
    </Typography>
  ) : (
    <Typography style={{ display: "inline-block" }}>{charac + improv + add}</Typography>
  );
}

function createData(improvs, characs, wargear, baseWargear) {
  var bonus = { move: 0, fight: 0, shoot: 0, strength: 0, defense: 0, attacks: 0, wounds: 0, courage: 0, might: 0, will: 0, faith: 0 };

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
    move: getCharacteristicFor(characs.move, improvs.move + bonus.move, '"'),
    fight: getCharacteristicFor(characs.fight, improvs.fight + bonus.fight),
    shoot: getCharacteristicFor(characs.shoot, improvs.shoot + bonus.shoot, "+"),
    strength: getCharacteristicFor(characs.strength, improvs.strength + bonus.strength),
    defense: getCharacteristicFor(characs.defense, improvs.defense + bonus.defense),
    attacks: getCharacteristicFor(characs.attacks, improvs.attacks + bonus.attacks),
    wounds: getCharacteristicFor(characs.wounds, improvs.wounds + bonus.wounds),
    courage: getCharacteristicFor(characs.courage, improvs.courage + bonus.courage),
    might: getCharacteristicFor(characs.might, improvs.might + bonus.might),
    will: getCharacteristicFor(characs.will, improvs.will + bonus.will),
    faith: getCharacteristicFor(characs.faith, improvs.faith + bonus.faith)
  };
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto",
    marginBottom: theme.spacing.unit * 2
  },
  head: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.secondary.dark : theme.palette.secondary.main
  }
});

function UnitCharacteristics(props) {
  const { improvs, characs, classes, wargear, baseWargear } = props;

  const characteristics = createData(improvs, characs, wargear, baseWargear);

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
            <CustomTableCell>{characteristics.defense}</CustomTableCell>
            <CustomTableCell>{characteristics.attacks}</CustomTableCell>
            <CustomTableCell>{characteristics.wounds}</CustomTableCell>
            <CustomTableCell>{characteristics.courage}</CustomTableCell>
            <CustomTableCell>
              {characteristics.might}/{characteristics.will}/{characteristics.faith}
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

UnitCharacteristics.propTypes = {
  classes: PropTypes.object.isRequired,
  characs: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  improvs: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(UnitCharacteristics);
