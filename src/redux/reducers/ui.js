import { SET_THEME, THUMBNAIL_SWITCHER } from "./../actions/types";

// All the thumbnail switch needed
export const ARMY_TROOP_CARD_SWITCH = "ARMY_TROOP_CARD_SWITCH";
export const COMPANY_TROOP_CARD_SWITCH = "COMPANY_TROOP_CARD_SWITCH";

const uiInitialState = {
  themeType: "light",
  thumbnailSwitch: { ARMY_TROOP_CARD_SWITCH: false }
};

export default function uiReducer(state = uiInitialState, action) {
  //   console.log("UI action type => ", action.type);
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeType: action.payload };

    case THUMBNAIL_SWITCHER: {
      switch (action.payload) {
        case ARMY_TROOP_CARD_SWITCH:
          return {
            ...state,
            thumbnailSwitch: { ...state.thumbnailSwitch, ARMY_TROOP_CARD_SWITCH: !state.thumbnailSwitch[ARMY_TROOP_CARD_SWITCH] }
          };
        case COMPANY_TROOP_CARD_SWITCH:
          return {
            ...state,
            thumbnailSwitch: { ...state.thumbnailSwitch, COMPANY_TROOP_CARD_SWITCH: !state.thumbnailSwitch[COMPANY_TROOP_CARD_SWITCH] }
          };

        default:
          return { ...state };
      }
    }

    default:
      return state;
  }
}
