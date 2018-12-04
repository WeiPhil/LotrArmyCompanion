import React from "react";
import { Typography, Grid, CircularProgress } from "@material-ui/core";

const LoadingView = props => {
  return (
    <Grid container justify="center">
      <Grid item>
        <CircularProgress color="secondary" />
        <Typography variant="h5">Loading</Typography>;
      </Grid>
    </Grid>
  );
};

export default LoadingView;
