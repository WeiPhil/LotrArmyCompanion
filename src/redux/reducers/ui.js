import { SET_THEME } from "./../actions/types";

const uiInitialState = {
  themeType: "light"
};

export default function uiReducer(state = uiInitialState, action) {
  //   console.log("UI action type => ", action.type);
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeType: action.payload };
    default:
      return state;
  }
}
