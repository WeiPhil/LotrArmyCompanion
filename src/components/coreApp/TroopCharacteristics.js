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
    padding: theme.spacing.unit * 1.2
  }
}))(TableCell);

let id = 0;
function createData(
  move,
  fight,
  strength,
  defense,
  attack,
  wounds,
  courage,
  mightWillFaith
) {
  return {
    id,
    move,
    fight,
    strength,
    defense,
    attack,
    wounds,
    courage,
    mightWillFaith
  };
}

const characteristics = createData('10"', "3/-", 3, 3, 1, 1, 2, "-/-/-");

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    marginBottom: theme.spacing.unit * 3
  },
  table: {
    minWidth: 200
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function TroopCharacteristics(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
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
          <TableRow className={classes.row} key={characteristics.id}>
            <CustomTableCell component="th" scope="row">
              {characteristics.move}
            </CustomTableCell>
            <CustomTableCell>{characteristics.fight}</CustomTableCell>
            <CustomTableCell>{characteristics.strength}</CustomTableCell>
            <CustomTableCell>{characteristics.defense}</CustomTableCell>
            <CustomTableCell>{characteristics.attack}</CustomTableCell>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TroopCharacteristics);
