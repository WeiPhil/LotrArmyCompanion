import {
  GET_USER_COMPANIES,
  GET_ARMIES,
  GET_COMPANY_FACTIONS,
  API_START,
  API_END,
  ON_GET_ERROR,
  DISCONNECT,
  LOGIN_SUCCESS,
  ADD_COMPANY,
  POSTING_FAILURE,
  POSTING_SUCCESS,
  POST_STATUS_RESET
} from "../actions/types";

const serverAccessInitialState = {
  isLoadingCompanies: false,
  isLoadingArmies: false,
  isLoadingCompanyFactions: false,
  armiesNeedRefetch: true,
  companiesNeedRefetch: false,
  companyFactionsNeedRefetch: true,
  getError: false,
  postingSuccess: false,
  postingToDatabase: false,
  postResponse: ""
};

export default function databaseAccessReducer(state = serverAccessInitialState, action) {
  // console.log("ServerAccess action type => ", action.type);
  switch (action.type) {
    // API Cases
    case API_START:
      if (action.payload === GET_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: true, getError: false };
      } else if (action.payload === GET_ARMIES) {
        return { ...state, isLoadingArmies: true, getError: false };
      } else if (action.payload === GET_COMPANY_FACTIONS) {
        return { ...state, isLoadingCompanyFactions: true, getError: false };
      } else if (action.payload === ADD_COMPANY) {
        return { ...state, postingToDatabase: true };
      } else {
        return state;
      }

    case ON_GET_ERROR:
      return { ...state, getError: true, companiesNeedRefetch: true, armiesNeedRefetch: true, companyFactionsNeedRefetch: true };

    case API_END:
      if (action.payload === GET_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: false, companiesNeedRefetch: state.getError };
      } else if (action.payload === GET_ARMIES) {
        return { ...state, isLoadingArmies: false, armiesNeedRefetch: state.getError };
      } else if (action.payload === GET_COMPANY_FACTIONS) {
        return { ...state, isLoadingCompanyFactions: false, companyFactionsNeedRefetch: state.getError };
      } else if (action.payload === ADD_COMPANY) {
        return { ...state, postingToDatabase: false };
      } else {
        return state;
      }

    case LOGIN_SUCCESS:
      return { ...state, companiesNeedRefetch: true };

    case DISCONNECT:
      return { ...state, getError: false };

    case POSTING_SUCCESS:
      return { ...state, postingSuccess: true, postResponse: action.payload };

    case POSTING_FAILURE:
      return { ...state, postingSuccess: false, postResponse: action.payload };

    case POST_STATUS_RESET:
      return { ...state, postingToDatabase: false, postingSuccess: false, postResponse: "" };

    default:
      return state;
  }
}
