import {
  ADD_ATTACK_TO,
  SET_USER_COMPANIES,
  FETCH_USER_COMPANIES,
  SET_ARMIES,
  FETCH_ARMIES,
  API_START,
  API_END,
  ON_FETCH_ERROR,
  SET_THEME
} from "../actions/types";

const initialState = {
  isLoadingCompanies: true,
  isLoadingArmies: true,
  armiesNeedRefetch: true,
  companiesNeedRefetch: true,
  fetchError: false,
  themeType: "light"
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
      return { ...state, companiesData: action.payload };

    case SET_ARMIES:
      return { ...state, armiesData: action.payload };

    case SET_THEME:
      return { ...state, themeType: action.payload };

    // API Cases
    case API_START:
      if (action.payload === FETCH_USER_COMPANIES) {
        return { ...state, isLoadingData: true };
      } else if (action.payload === FETCH_ARMIES) {
        return { ...state, isLoadingArmies: true };
      }
      break;

    case ON_FETCH_ERROR:
      return { ...state, fetchError: true };

    case API_END:
      if (action.payload === FETCH_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: false, companiesNeedRefetch: false };
      } else if (action.payload === FETCH_ARMIES) {
        return { ...state, isLoadingArmies: false, armiesNeedRefetch: false };
      }
      break;
    default:
      return state;
  }
}
