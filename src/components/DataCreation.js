export function createCardData(troopData, isCompanyCard, companyFaction, armies) {
  if (!isCompanyCard) {
    return {
      baseTroop: {
        points: troopData["points"],
        name: troopData["display_name"],
        unit_type: troopData["unit_type"],
        troop_type: troopData["troop_type"],
        base_wargear: troopData["base_wargear"],
        optional_wargear: troopData["optional_wargear"],
        special_rules: troopData["special_rules"],
        heroic_actions: troopData["heroic_actions"],
        magical_powers: troopData["magical_powers"],
        description: troopData["description"],
        characteristics: troopData["characteristics"],
        image_path: require("./../assets/images/" + troopData["image_path"])
      }
    };
  }

  const userTroop = {
    access_name: troopData["access_name"],
    display_name: troopData["display_name"],
    unit_name: troopData["unit_name"],
    unit_type: troopData["unit_type"],
    troop_type: troopData["troop_type"],
    points: troopData["points"],
    experience: troopData["experience"],
    improvements: troopData["improvements"],
    wargear: troopData["wargear"],
    injuries: troopData["injuries"],
    special_rules: troopData["special_rules"],
    heroic_actions: troopData["heroic_actions"],
    magical_powers: troopData["magical_powers"],
    notes: troopData["notes"],
    image_path: require("./../assets/images/" + troopData["image_path"])
  };

  const unit_name = userTroop.unit_name;

  const baseTroop = armies[companyFaction][unit_name];

  if (isCompanyCard) {
    return {
      userTroop: userTroop,
      baseTroop: {
        points: baseTroop["points"],
        name: baseTroop["display_name"],
        unit_type: baseTroop["unit_type"],
        troop_type: baseTroop["troop_type"],
        base_wargear: baseTroop["base_wargear"],
        optional_wargear: baseTroop["optional_wargear"],
        special_rules: baseTroop["special_rules"],
        heroic_actions: baseTroop["heroic_actions"],
        magical_powers: baseTroop["magical_powers"],
        description: baseTroop["description"],
        characteristics: baseTroop["characteristics"]
      }
    };
  }
}
