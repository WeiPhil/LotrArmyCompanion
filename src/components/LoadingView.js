import React from "react";
import { Typography, Grid, CircularProgress } from "@material-ui/core";

const LoadingView = props => {
  return (
    <Grid direction="column" container alignItems="center" justify="center">
      <Grid item>
        <CircularProgress color="secondary" />
      </Grid>
      <Grid item>
        <Typography variant="h5">Loading</Typography>
      </Grid>
    </Grid>
  );
};

export default LoadingView;
