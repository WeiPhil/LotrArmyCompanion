/** Functions for pure calculations */

import { WEAPON_COSTS, WARRIOR } from "./Constants";

export function calculatePoints(baseTroop, userTroop) {
  const troop_type = userTroop.troop_type;

  const totalAttackWounds =
    userTroop.improvements["attacks"] +
    userTroop.improvements["wounds"] +
    baseTroop.characteristics["attacks"] +
    baseTroop.characteristics["wounds"];

  var costWargear = 0;

  const troopWargearState = totalAttackWounds < 3 ? "low" : "high";

  userTroop.wargear
    .filter(weapon => !(baseTroop.base_wargear.indexOf(weapon) !== -1))
    .map(weapon => (costWargear += WEAPON_COSTS[weapon][troopWargearState]));

  var costImprovements = 0;

  if (troop_type !== WARRIOR) {
    for (var charac in userTroop.improvements) {
      // check if the property/key is defined in the object itself, not in parent
      if (userTroop.improvements.hasOwnProperty(charac)) {
        if (
          charac === "fight" ||
          charac === "strength" ||
          charac === "defense" ||
          charac === "courage" ||
          charac === "might" ||
          charac === "will" ||
          charac === "faith"
        ) {
          costImprovements += userTroop.improvements[charac] * 5;
        } else if (charac === "attacks" || charac === "wounds") {
          costImprovements += userTroop.improvements[charac] * 10;
        }
      }
    }
  }

  console.log(userTroop.display_name);
  console.log(costWargear);
  console.log(totalAttackWounds);

  return baseTroop.points + costImprovements + costWargear;
}
