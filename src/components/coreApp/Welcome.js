import React from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import InlineLink from "./../customs/InlineLink";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 3
  },
  divider: {
    margin: theme.spacing.unit
  }
});

const Welcome = props => {
  return (
    <Grid className={props.classes.container} container direction={"column"}>
      <Grid item>
        <Typography align="center" variant="h6" gutterBottom>
          Welcome to the Lord of the Ring Companion app!
        </Typography>
        <Divider className={props.classes.divider} />
        <Typography variant="body2" gutterBottom>
          Here you will be able to create your companies for Battle Companies or simply an army for the Table top game Lord of the Ring.
        </Typography>
        <Typography variant="body2" gutterBottom>
          {" "}
          Before doing anything I would login!
        </Typography>
        <InlineLink align="center" path={"/register"} text={"Create an account here!"} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Welcome);
