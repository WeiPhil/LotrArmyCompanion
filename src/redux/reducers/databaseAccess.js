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
  POST_STATUS_RESET,
  ADD_COMPANY_UNIT,
  GET_SPECIAL_RULES,
  GET_EQUIPEMENTS,
  DELETE_COMPANY_UNIT,
  BUY_EQUIPEMENT
} from "../actions/types";

const serverAccessInitialState = {
  isLoadingCompanies: false,
  isLoadingArmies: false,
  isLoadingCompanyFactions: false,
  isLoadingSpecialRules: false,
  isLoadingEquipements: false,
  armiesNeedRefetch: true,
  companiesNeedRefetch: false,
  companyFactionsNeedRefetch: true,
  specialRulesNeedRefetch: true,
  equipementsNeedRefetch: true,
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
      } else if (action.payload === GET_SPECIAL_RULES) {
        return { ...state, isLoadingSpecialRules: true, getError: false };
      } else if (action.payload === GET_EQUIPEMENTS) {
        return { ...state, isLoadingEquipements: true, getError: false };
      } else if (action.payload === ADD_COMPANY) {
        return { ...state, postingToDatabase: true };
      } else if (action.payload === ADD_COMPANY_UNIT) {
        return { ...state, postingToDatabase: true };
      } else if (action.payload === DELETE_COMPANY_UNIT) {
        return { ...state, postingToDatabase: true };
      } else if (action.payload === BUY_EQUIPEMENT) {
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
      } else if (action.payload === GET_SPECIAL_RULES) {
        return { ...state, isLoadingSpecialRules: false, specialRulesNeedRefetch: state.getError };
      } else if (action.payload === GET_EQUIPEMENTS) {
        return { ...state, isLoadingEquipements: false, equipementsNeedRefetch: state.getError };
      } else if (action.payload === ADD_COMPANY) {
        return { ...state, postingToDatabase: false };
      } else if (action.payload === ADD_COMPANY_UNIT) {
        return { ...state, postingToDatabase: false };
      } else if (action.payload === DELETE_COMPANY_UNIT) {
        return { ...state, postingToDatabase: false };
      } else if (action.payload === BUY_EQUIPEMENT) {
        return { ...state, postingToDatabase: false };
      } else {
        return state;
      }

    case LOGIN_SUCCESS:
      return { ...state, companiesNeedRefetch: true };

    case DISCONNECT:
      return { ...state, getError: false };

    case POSTING_SUCCESS:
      return { ...state, postingSuccess: true, postResponse: action.payload.message };

    case POSTING_FAILURE:
      return { ...state, postingSuccess: false, postResponse: action.payload.message };

    case POST_STATUS_RESET:
      return { ...state, postingToDatabase: false, postingSuccess: false, postResponse: "" };

    default:
      return state;
  }
}
