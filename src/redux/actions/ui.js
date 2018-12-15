import { SET_THEME, ARMY_TROOP_CARD_EXPAND_CLICK } from "./types";

export function setTheme(type) {
  return { type: SET_THEME, payload: type };
}

export function armyTroopCardExpandClick() {
  return { type: ARMY_TROOP_CARD_EXPAND_CLICK };
}
