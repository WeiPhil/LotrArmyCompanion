import { SET_THEME, ARMY_TROOP_CARD_EXPAND_CLICK } from "./../actions/types";

const uiInitialState = {
  themeType: "light",
  troopCardSwitch: false
};

export default function uiReducer(state = uiInitialState, action) {
  //   console.log("UI action type => ", action.type);
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeType: action.payload };

    case ARMY_TROOP_CARD_EXPAND_CLICK:
      return { ...state, troopCardSwitch: !state.troopCardSwitch };

    default:
      return state;
  }
}
