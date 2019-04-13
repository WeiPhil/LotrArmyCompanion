import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TableBody, TableCell, TableRow, TableHead, Table, Paper, Popover } from "@material-ui/core";

import { extraPalette } from "./../../utils/UIColors";
import { prettify } from "../../utils/Functions";
import { EquipementIcon, PromotionIcon } from "../icons/CharacteristicsIcons";

const CustomTableHeader = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 1.4,
    paddingRight: 0,
    fontSize: 14,
    color: theme.palette.type === "dark" ? theme.palette.button : theme.palette.background.default
  }
}))(TableCell);

const CustomTableCell = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 1.4,
    paddingRight: 0,
    fontSize: 14,
    color: theme.palette.text.secondary
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto",
    marginBottom: theme.spacing.unit * 2
  },
  head: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.secondary.dark : theme.palette.secondary.main
  },
  bonusTypography: {
    color: theme.palette.type === "dark" ? extraPalette.dark.bonus.light : extraPalette.light.bonus.dark
  },
  malusTypography: {
    color: theme.palette.type === "dark" ? extraPalette.dark.malus.light : extraPalette.light.malus.dark
  },
  neutralTypography: {
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.primary.dark
  },
  popover: {
    pointerEvents: "none",
    padding: 0
  },
  paper: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingBottom: "4px",
    paddingTop: "2px"
  },
  popoverName: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing.unit
  },
  icons: {
    cursor: "initial"
  }
});

class UnitCharacteristics extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      anchorEl: null,
      openedPopoverId: null,
      characteristicChanger: this.getBaseChangerObj()
    };
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  componentDidMount() {
    const companyUnit = this.props.companyUnit;
    if (companyUnit !== undefined) {
      this.setState({
        characteristicChanger: this.getCharacteristicChanger(companyUnit.wargear, companyUnit.promotions, companyUnit.special_rules)
      });
    }
  }

  handlePopoverOpen(event, popoverId) {
    this.setState({
      openedPopoverId: popoverId,
      anchorEl: event.target
    });
  }
  handlePopoverClose() {
    this.setState({
      openedPopoverId: null,
      anchorEl: null
    });
  }

  getBaseChangerObj = () => {
    return {
      move: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      fight: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      shoot: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      strength: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      defence: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      attacks: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      wounds: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      courage: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      might: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      will: { wargear: [], special_rules: [], promotions: [], injuries: [] },
      fate: { wargear: [], special_rules: [], promotions: [], injuries: [] }
    };
  };
  getCharacteristicChanger = (equipements, promotions, special_rules, injuries) => {
    const characteristicChanger = this.getBaseChangerObj();
    equipements.map(equipementObj => {
      if ("altering_effect" in equipementObj) {
        if (equipementObj.points !== 0 && equipementObj.bought === "yes") {
          characteristicChanger[equipementObj.altering_effect.characteristic].wargear.push({
            name: equipementObj.name,
            value: equipementObj.altering_effect.value
          });
        }
      }
      return null;
    });
    promotions.map(promotionsObj => {
      if ("altering_effect" in promotionsObj) {
        characteristicChanger[promotionsObj.altering_effect.characteristic].promotions.push({
          name: promotionsObj.name,
          value: promotionsObj.altering_effect.value * promotionsObj.number
        });
      }
      return null;
    });
    special_rules.map(specialRuleObj => {
      if ("altering_effect" in specialRuleObj) {
        characteristicChanger[specialRuleObj.altering_effect.characteristic].promotions.push({
          name: specialRuleObj.name,
          value: specialRuleObj.altering_effect.value
        });
      }
      return null;
    });
    // injuries.map(injuryObj => {
    //   if ("altering_effect" in injuryObj) {
    //     characteristicChanger[injuryObj.altering_effect.characteristic].promotions.push({
    //       name: injuryObj.name,
    //       value: injuryObj.altering_effect.value
    //     });
    //   }
    // });
    return characteristicChanger;
  };

  getCharacteristics = () => {
    const adaptiveTypo = (value, characteristic) => {
      const iconColor = this.props.theme.palette.type === "dark" ? "#FFFFFF" : this.props.theme.palette.secondary.main;
      const wargearValues = this.state.characteristicChanger[characteristic].wargear;
      const promotionValues = this.state.characteristicChanger[characteristic].promotions;
      const specialRulesValues = this.state.characteristicChanger[characteristic].special_rules;
      const totalValueWargear = wargearValues.reduce((acc, wargear) => {
        return acc + wargear.value;
      }, 0);

      const totalValuePromotions = promotionValues.reduce((acc, promotion) => {
        return acc + promotion.value;
      }, 0);

      const totalValueSpecialRules = specialRulesValues.reduce((acc, specialRule) => {
        return acc + specialRule.value;
      }, 0);

      const totalValue = value + totalValueWargear + totalValuePromotions + totalValueSpecialRules;

      const typographyClass =
        totalValue > value
          ? this.props.classes.bonusTypography
          : totalValue === value
          ? this.props.classes.neutralTypography
          : this.props.classes.malusTypography;

      const popoverId = "mouse-over-popover-" + characteristic;
      const open = this.state.openedPopoverId === popoverId;
      return (
        <>
          <Typography
            aria-owns={open ? popoverId : undefined}
            aria-haspopup="true"
            onMouseEnter={e => this.handlePopoverOpen(e, popoverId)}
            onMouseLeave={this.handlePopoverClose}
            className={typographyClass}
            style={{ display: "inline-block" }}
          >
            {totalValue}
          </Typography>
          {totalValue !== value && (
            <Popover
              style={{ transform: "translate(0,-10px)" }}
              id={popoverId}
              className={this.props.classes.popover}
              classes={{
                paper: this.props.classes.paper
              }}
              open={open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              onClose={this.handlePopoverClose}
              disableRestoreFocus
            >
              {wargearValues.map((wargear, index) => {
                const valueTypography = wargear.value > 0 ? bonusTypo("+ " + wargear.value) : malusTypo("- " + wargear.value);
                return (
                  <span key={index}>
                    {index === 0 ? (
                      <EquipementIcon style={{ fontSize: "18px", transform: "translate(0,2px)" }} nativeColor={iconColor} />
                    ) : (
                      // </IconButton>
                      <Typography className={this.props.classes.popoverName} style={{ display: "inline-block" }}>
                        &nbsp;|&nbsp;
                      </Typography>
                    )}
                    <Typography className={this.props.classes.popoverName} style={{ display: "inline-block" }}>
                      &nbsp;{prettify(wargear.name)}
                    </Typography>
                    {valueTypography}
                  </span>
                );
              })}
              {promotionValues.map((promotion, index) => {
                const valueTypography = promotion.value > 0 ? bonusTypo("+ " + promotion.value) : malusTypo("- " + promotion.value);
                return (
                  <span key={index}>
                    <PromotionIcon style={{ fontSize: "18px", transform: "translate(0,2px)" }} nativeColor={iconColor} />

                    <Typography className={this.props.classes.popoverName} style={{ display: "inline-block" }}>
                      &nbsp;{prettify(promotion.name)}
                    </Typography>
                    {valueTypography}
                  </span>
                );
              })}
            </Popover>
          )}
        </>
      );
    };

    const bonusTypo = value => (
      <Typography className={this.props.classes.bonusTypography} style={{ display: "inline-block" }}>
        {value}
      </Typography>
    );

    const malusTypo = value => (
      <Typography className={this.props.classes.malusTypography} style={{ display: "inline-block" }}>
        {value}
      </Typography>
    );
    const companyUnitCharacteristics = this.props.companyUnit.characteristics;

    const characteristics = {
      move: adaptiveTypo(companyUnitCharacteristics.move, "move"),
      fight: adaptiveTypo(companyUnitCharacteristics.fight, "fight"),
      shoot: adaptiveTypo(companyUnitCharacteristics.shoot, "shoot"),
      strength: adaptiveTypo(companyUnitCharacteristics.strength, "strength"),
      defence: adaptiveTypo(companyUnitCharacteristics.defence, "defence"),
      attacks: adaptiveTypo(companyUnitCharacteristics.attacks, "attacks"),
      wounds: adaptiveTypo(companyUnitCharacteristics.wounds, "wounds"),
      courage: adaptiveTypo(companyUnitCharacteristics.courage, "courage"),
      might: adaptiveTypo(companyUnitCharacteristics.might, "might"),
      will: adaptiveTypo(companyUnitCharacteristics.will, "will"),
      fate: adaptiveTypo(companyUnitCharacteristics.fate, "fate")
    };
    return characteristics;
  };

  render() {
    const { companyUnit, characteristics, classes } = this.props;
    const chars = companyUnit === undefined ? characteristics : this.getCharacteristics();

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              <CustomTableHeader>Move</CustomTableHeader>
              <CustomTableHeader>F/S+</CustomTableHeader>
              <CustomTableHeader>S</CustomTableHeader>
              <CustomTableHeader>D</CustomTableHeader>
              <CustomTableHeader>A</CustomTableHeader>
              <CustomTableHeader>W</CustomTableHeader>
              <CustomTableHeader>C</CustomTableHeader>
              <CustomTableHeader>M/W/F</CustomTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CustomTableCell component="th" scope="row">
                {chars.move}"
              </CustomTableCell>
              <CustomTableCell>
                {chars.fight}/{chars.shoot}+
              </CustomTableCell>
              <CustomTableCell>{chars.strength}</CustomTableCell>
              <CustomTableCell>{chars.defence}</CustomTableCell>
              <CustomTableCell>{chars.attacks}</CustomTableCell>
              <CustomTableCell>{chars.wounds}</CustomTableCell>
              <CustomTableCell>{chars.courage}</CustomTableCell>
              <CustomTableCell>
                {chars.might}/{chars.will}/{chars.fate}
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UnitCharacteristics.propTypes = {
  classes: PropTypes.object.isRequired,
  characteristics: PropTypes.object,
  companyUnit: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(UnitCharacteristics);
