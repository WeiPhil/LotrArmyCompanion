/** Functions for pure calculations */

import { WEAPON_COSTS, WARRIOR } from "./Constants";

export function calculatePoints(unit, company_unit) {
  const troop_type = company_unit.troop_type;

  const totalAttackWounds =
    company_unit.improvements["attacks"] + company_unit.improvements["wounds"] + unit.characteristics["attacks"] + unit.characteristics["wounds"];

  var costWargear = 0;

  const troopWargearState = totalAttackWounds < 3 ? "low" : "high";

  company_unit.wargear.filter(weapon => !(unit.base_wargear.indexOf(weapon) !== -1)).map(weapon => (costWargear += WEAPON_COSTS[weapon][troopWargearState]));

  var costImprovements = 0;

  if (troop_type !== WARRIOR) {
    for (var charac in company_unit.improvements) {
      // check if the property/key is defined in the object itself, not in parent
      if (company_unit.improvements.hasOwnProperty(charac)) {
        if (
          charac === "fight" ||
          charac === "strength" ||
          charac === "defence" ||
          charac === "courage" ||
          charac === "might" ||
          charac === "will" ||
          charac === "fate"
        ) {
          costImprovements += company_unit.improvements[charac] * 5;
        } else if (charac === "attacks" || charac === "wounds") {
          costImprovements += company_unit.improvements[charac] * 10;
        }
      }
    }
  }

  return unit.points + costImprovements + costWargear + company_unit.special_rules.length * 5;
}

export function calculateRating(company) {
  var rating = 0;
  company.troops.map(troop => (rating += troop.points));

  var effective_rating = rating;
  company.injured.map(troop => (effective_rating -= company.troops[company.access_map[troop]].points));

  return { rating: rating, effective_rating: effective_rating };
}
