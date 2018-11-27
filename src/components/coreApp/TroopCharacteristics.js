import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 1.4,
    paddingRight: 0,
    fontSize: 14
  }
}))(TableCell);

function createData(characteristics) {
  return {
    move: characteristics["move"] + '"',
    fight: characteristics["fight"] + "/" + characteristics["shoot"] + "+",
    strength: characteristics["strength"],
    defense: characteristics["defense"],
    attacks: characteristics["attacks"],
    wounds: characteristics["wounds"],
    courage: characteristics["courage"],
    mightWillFaith: characteristics["might"] + "/" + characteristics["will"] + "/" + characteristics["faith"]
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
    color: "white",
    backgroundColor: theme.palette.type === "dark" ? theme.palette.secondary.dark : theme.palette.secondary.light
  }
});

function TroopCharacteristics(props) {
  const { characs, classes } = props;

  const characteristics = characs !== undefined ? createData(characs) : "undefined";

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow className={classes.head}>
            <CustomTableCell>Move</CustomTableCell>
            <CustomTableCell>F/S+</CustomTableCell>
            <CustomTableCell>S</CustomTableCell>
            <CustomTableCell>D</CustomTableCell>
            <CustomTableCell>A</CustomTableCell>
            <CustomTableCell>W</CustomTableCell>
            <CustomTableCell>C</CustomTableCell>
            <CustomTableCell>M</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell component="th" scope="row">
              {characteristics.move}
            </CustomTableCell>
            <CustomTableCell>{characteristics.fight}</CustomTableCell>
            <CustomTableCell>{characteristics.strength}</CustomTableCell>
            <CustomTableCell>{characteristics.defense}</CustomTableCell>
            <CustomTableCell>{characteristics.attacks}</CustomTableCell>
            <CustomTableCell>{characteristics.wounds}</CustomTableCell>
            <CustomTableCell>{characteristics.courage}</CustomTableCell>
            <CustomTableCell>{characteristics.mightWillFaith}</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

TroopCharacteristics.propTypes = {
  classes: PropTypes.object.isRequired,
  characs: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(TroopCharacteristics);
