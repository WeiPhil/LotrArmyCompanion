import "typeface-roboto";

import React, { Component } from "react";

// Material-UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import MainInterface from "./components/MainInterface";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MainContent from "./components/MainContent";

import MainContentHolder from "./components/MainContentHolder";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#428e92",
      main: "#006064",
      dark: "#00363a",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#be9c91",
      main: "#8d6e63",
      dark: "#5f4339",
      contrastText: "#ffffff"
    }
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
