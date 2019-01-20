import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import { TUMBNAIL_CARD_SIZE, CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH } from "../../utils/Constants";

import { Grow, Collapse } from "@material-ui/core";

import { connect } from "react-redux";
import { thumbnailSwitcher } from "./../../redux/actions/ui";

const styles = theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      maxWidth: CARD_MAX_WIDTH
    }
  },
  mediaExpanded: {
    height: CARD_IMAGE_HEIGHT
  },
  media: {
    minWidth: TUMBNAIL_CARD_SIZE,
    width: "100%",
    height: TUMBNAIL_CARD_SIZE * 0.5
  }
});

const mapStateToProps = ({ ui }) => ({
  thumbnailSwitch: ui.thumbnailSwitch
});

class Thumbnailer extends Component {
  state = {
    detailsOpen: !this.props.mobile,
    collapseOpen: !this.props.mobile,
    collapserJustClicked: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.mobile) {
      if (prevProps.thumbnailSwitch[this.props.switchID] !== this.props.thumbnailSwitch[this.props.switchID] && !this.state.collapserJustClicked) {
        if (this.state.detailsOpen === true) this.setState(() => ({ detailsOpen: false }));
      } else if (prevState.collapserJustClicked !== this.state.collapserJustClicked && this.state.collapserJustClicked === true) {
        this.setState(state => ({ collapserJustClicked: false, detailsOpen: !state.detailsOpen }));
      }

      if (prevState.detailsOpen !== this.state.detailsOpen) this.setState(() => ({ collapseOpen: this.state.detailsOpen }));
    }
  }

  handleExpandClick = () => {
    this.setState(() => ({ collapserJustClicked: true }));
    this.props.thumbnailSwitcher(this.props.switchID);
  };

  render() {
    const {
      cardMediaImagePath,
      minimalContent,
      cardContent,
      floatLeftContent,
      floatRightContent,
      classes,
      additionalCardStyle,
      additionalCardActionAreaStyle,
      mobile
    } = this.props;

    const widthConstraint = { width: mobile && !this.state.detailsOpen ? TUMBNAIL_CARD_SIZE : undefined };

    return (
      <Grow in={true} timeout={this.props.timeout}>
        <div style={additionalCardStyle}>
          <Card style={{ ...additionalCardStyle, ...widthConstraint }} className={classes.card}>
            <CardActionArea style={{ ...additionalCardActionAreaStyle }} disabled={!this.props.mobile} onClick={this.handleExpandClick}>
              <CardMedia className={this.state.detailsOpen ? classes.mediaExpanded : classes.media} image={cardMediaImagePath} title={cardMediaImagePath} />
            </CardActionArea>

            {!this.state.detailsOpen && minimalContent}

            {!this.props.mobile ? (
              cardContent
            ) : (
              <Collapse in={this.state.detailsOpen}>
                {/* small hack using another boolean that is set once we close it to have a smooth collapse closing */}
                <div>{this.state.collapseOpen && cardContent}</div>
              </Collapse>
            )}
          </Card>
          {!this.state.detailsOpen && [
            <div
              key={"floatPoints"}
              style={{
                zIndex: 10000,
                position: "fixed",
                top: -5,
                right: -5
              }}
            >
              {floatLeftContent}
            </div>,
            <div
              key={"floatType"}
              style={{
                zIndex: 10000,
                position: "fixed",
                top: -5,
                left: -5
              }}
            >
              {floatRightContent}
            </div>
          ]}
        </div>
      </Grow>
    );
  }
}

Thumbnailer.propTypes = {
  classes: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { thumbnailSwitcher }
)(withStyles(styles, { withTheme: true })(Thumbnailer));
