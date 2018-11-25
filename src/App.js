import "typeface-roboto";

import React, { Component } from "react";

// Material-UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import MainInterface from "./components/MainInterface";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MainContent from "./components/MainContent";

import MainContentHolder from "./components/MainContentHolder";
import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: blueGrey
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MainInterface>
          <MainContentHolder>
            <MainContent />
          </MainContentHolder>
        </MainInterface>
      </MuiThemeProvider>
    );
  }
}

export default App;
