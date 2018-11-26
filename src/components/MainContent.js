import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import TroopCard from "./coreApp/TroopCard";
import Grid from "@material-ui/core/Grid";

import { EMPTYJSON } from "./../utils/Constants";

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      troops: EMPTYJSON
    };
  }

  handleFetchedData(data) {
    let moria = JSON.parse(data);
    let troops = moria.troops;
    this.setState({ troops });
  }

  componentDidMount() {
    fetch("http://localhost:5000/getJson")
      .then(response => response.json())
      .then(data => this.handleFetchedData(data));
  }

  render() {
    return (
      <main>
        <Grid container justify="space-evenly">
          <TroopCard troopData={this.state.troops[0]} />
          <TroopCard troopData={this.state.troops[1]} />
          <TroopCard troopData={this.state.troops[0]} />
          <TroopCard troopData={this.state.troops[0]} />
          <TroopCard troopData={this.state.troops[1]} />
          <TroopCard troopData={this.state.troops[1]} />
        </Grid>

        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    );
  }
}

export default MainContent;
