import "typeface-roboto";

import React, { Component } from "react";

import { connect } from "react-redux";

// Material-UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import MainInterface from "./components/MainInterface";
import ChatInterface from "./components/coreApp/chat/ChatInterface";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BattleInterface from "./components/coreApp/battle/BattleInterface";

const themes = {
  light: createMuiTheme({
    // overrides: {
    //   MuiPaper: {
    //     // Name of the component ⚛️ / style sheet
    //     root: {
    //       // Name of the rule
    //       backgroundColor: "#ECEFF1" // Some CSS
    //     }
    //   }
    // },
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
        light: "#90A4AE",
        main: "#455A64",
        dark: "#37474F",
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

const mapStateToProps = ({ ui }) => ({
  themeType: ui.themeType
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={themes[this.props.themeType]}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/battle" component={BattleInterface} />
            <Route exact path="/chat" component={ChatInterface} />
            <Route path="/" component={MainInterface} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
