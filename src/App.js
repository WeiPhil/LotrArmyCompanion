import "typeface-roboto";

import React, { Component } from "react";

import { connect } from "react-redux";

// Material-UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import MainInterface from "./components/MainInterface";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MainContent from "./components/MainContent";

const themes = {
  light: createMuiTheme({
    palette: {
      type: "light",
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
  }),
  dark: createMuiTheme({
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
  })
};

const mapStateToProps = ({ themeType }) => ({
  themeType: themeType
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={themes[this.props.themeType]}>
        <CssBaseline />
        <MainInterface>
          <MainContent />
        </MainInterface>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
