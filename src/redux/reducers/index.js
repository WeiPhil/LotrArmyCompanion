import { ADD_ATTACK_TO, SET_USER_COMPANIES, FETCH_USER_COMPANIES, API_START, API_END, SET_MENU_STATE } from "../actions/types";
import { ARMY_OVERVIEW } from "../../utils/Constants";

const initialState = {
  menuState: ARMY_OVERVIEW
};

/** Mini check-list for adding function:
 *   - actions/index.js -> add the action that is triggered from app
 *   - actions/types.js -> add correspondig constants
 *   - add a case HERE
 **/

// rootReducer
export default function(state = initialState, action) {
  console.log("action type => ", action.type);
  switch (action.type) {
    case ADD_ATTACK_TO:
      return state;
    //       const newCompanies = Object.assign({}, state.userCompanies);
    //       const index = newCompanies.companies[0].map_to_index[action.payload];
    //       newCompanies.companies[0].troops[index].improvements.attacks += 1;
    //       return { ...state, userCompanies: newCompanies };
    //     }
    case SET_USER_COMPANIES:
      return { ...state, companyData: action.payload };

    case SET_MENU_STATE:
      return { ...state, menuState: action.payload };

    // API Cases
    case API_START:
      if (action.payload === FETCH_USER_COMPANIES) {
        return { ...state, isLoadingData: true };
      }
      break;
    case API_END:
      if (action.payload === FETCH_USER_COMPANIES) {
        return { ...state, isLoadingData: false };
      }
      break;
    default:
      return state;
  }
}
