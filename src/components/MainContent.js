import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import TroopCard from "./coreApp/TroopCard";
import Grid from "@material-ui/core/Grid";

import { EMPTYJSON } from "./../utils/Constants";

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataFetched: false,
      troops: EMPTYJSON
    };
  }

  handleFetchedData(data) {
    let troops = JSON.parse(data).troops;
    this.setState({ troops });
    this.setState({ dataFetched: true });
  }

  componentDidMount() {
    // CHANGE TO CORRECT IP EACH TIME
    fetch("http://192.168.1.4:5000/getJson")
      .then(response => response.json())
      .then(data => this.handleFetchedData(data));
  }

  renderCard(troop, index) {
    const troopName = Object.keys(troop)[0];
    return <TroopCard key={index} troopData={troop[troopName]} />;
  }

  render() {
    return (
      <main>
        <Grid container justify="space-evenly">
          {this.state.dataFetched &&
            this.state.troops.map((troop, index) =>
              this.renderCard(troop, index)
            )}
          {this.state.dataFetched &&
            this.state.troops.map((troop, index) =>
              this.renderCard(troop, index)
            )}
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
