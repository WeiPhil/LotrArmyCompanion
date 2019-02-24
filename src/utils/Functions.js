export function prettify(str) {
  return str
    .split("_")
    .map(part => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export function unprettify(str) {
  return str
    .split(" ")
    .map(part => {
      return part.charAt(0).toLowerCase() + part.slice(1);
    })
    .join("_");
}

function getBaseChangerObj() {
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
}

function getCharacteristicChanger(equipements, promotions, special_rules, injuries) {
  const characteristicChanger = getBaseChangerObj();
  equipements.map(equipementObj => {
    if ("altering_effect" in equipementObj) {
      if (equipementObj.points !== 0) {
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
}

export function getCharacteristicsValue(unit, characteristic) {
  const characteristicChanger = getCharacteristicChanger(unit.wargear, unit.promotions, unit.special_rules);

  const value = unit.characteristics[characteristic];

  const wargearValues = characteristicChanger[characteristic].wargear;
  const promotionValues = characteristicChanger[characteristic].promotions;
  const specialRulesValues = characteristicChanger[characteristic].special_rules;
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
  return totalValue;
}
