import React, { Component } from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import MyCompanies from "./coreApp/MyCompanies";
import ArmyOverview from "./coreApp/ArmyOverview";
import Wiki from "./coreApp/Wiki";

import { MY_COMPANIES, ARMY_OVERVIEW, BUY_TROOPS, WIKI } from "./../utils/Constants";

const mapStateToProps = ({ menuState }) => ({ menuState });

class MainContent extends Component {
  renderContent(menuState) {
    switch (menuState) {
      case MY_COMPANIES:
        return <MyCompanies />;

      case ARMY_OVERVIEW:
        return <ArmyOverview />;
      case BUY_TROOPS:
        return (
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
            Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        );
      case WIKI:
        return <Wiki />;

      default:
        return (
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
            Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        );
    }
  }

  render() {
    const { menuState } = this.props;
    return this.renderContent(menuState);
  }
}

export default connect(mapStateToProps)(MainContent);
