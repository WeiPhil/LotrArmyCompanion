import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TableBody, TableCell, TableRow, TableHead, Table, Paper } from "@material-ui/core";

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
  // TODO : change this to use altering effects instead
  getCharacteristicFor(charac, improv, add = "") {
    return improv > 0 ? (
      <Typography className={this.props.classes.bonusTypography} style={{ display: "inline-block" }}>
        {charac + improv}
      </Typography>
    ) : (
      <Typography style={{ display: "inline-block" }}>{charac + improv + add}</Typography>
    );
  }

  render() {
    const { characteristics, classes } = this.props;

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
                {characteristics.move}"
              </CustomTableCell>
              <CustomTableCell>
                {characteristics.fight}/{characteristics.shoot}+
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
  characteristics: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(UnitCharacteristics);
