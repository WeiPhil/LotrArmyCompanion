import { GET_USER_COMPANIES, GET_ARMIES, API_START, API_END, ON_GET_ERROR, DISCONNECT, LOGIN_SUCCESS } from "../actions/types";

const serverAccessInitialState = {
  isLoadingCompanies: false,
  isLoadingArmies: false,
  armiesNeedRefetch: true,
  companiesNeedRefetch: false,
  getError: false
};

export default function databaseAccessReducer(state = serverAccessInitialState, action) {
  // console.log("ServerAccess action type => ", action.type);
  switch (action.type) {
    // API Cases
    case API_START:
      console.log("Api_start", action.payload);
      if (action.payload === GET_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: true, getError: false };
      } else if (action.payload === GET_ARMIES) {
        return { ...state, isLoadingArmies: true, getError: false };
      } else {
        return state;
      }

    case ON_GET_ERROR:
      return { ...state, getError: true, companiesNeedRefetch: true, armiesNeedRefetch: true };

    case API_END:
      if (action.payload === GET_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: false, companiesNeedRefetch: state.getError };
      } else if (action.payload === GET_ARMIES) {
        return { ...state, isLoadingArmies: false, armiesNeedRefetch: state.getError };
      } else {
        return state;
      }

    case LOGIN_SUCCESS:
      return { ...state, companiesNeedRefetch: true };

    case DISCONNECT:
      return { ...state, getError: false };

    default:
      return state;
  }
}
