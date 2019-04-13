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
        light: "#455A64",
        main: "#37474F",
        dark: "#263238",
        contrastText: "#ffffff"
      },
      secondary: {
        light: "#9E9E9E",
        main: "#757575",
        dark: "#616161",
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
        light: "#90A4AE",
        main: "#607D8B",
        dark: "#455A64",
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
