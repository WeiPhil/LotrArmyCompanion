import { SET_USER_COMPANIES, SET_ARMIES, DISCONNECT, SET_COMPANY_FACTIONS, SET_SPECIAL_RULES, POSTING_SUCCESS, SET_EQUIPEMENTS } from "../actions/types";

const dataInitialState = {
  armies: {},
  companies: [],
  companyFactions: {},
  specialRules: {},
  equipements: {},
  hasNoCompanies: true
};

export default function dataReducer(state = dataInitialState, action) {
  // console.log("Data action type => ", action.type);
  switch (action.type) {
    case SET_USER_COMPANIES:
      return { ...state, companies: action.payload.companies, hasNoCompanies: action.payload.hasNoCompanies };

    case SET_ARMIES:
      return { ...state, armies: action.payload };

    case SET_COMPANY_FACTIONS:
      return { ...state, companyFactions: action.payload };

    case SET_SPECIAL_RULES:
      return { ...state, specialRules: action.payload };

    case SET_EQUIPEMENTS: {
      return { ...state, equipements: action.payload };
    }

    case POSTING_SUCCESS: {
      const data = action.payload;
      if ("updatedCompany" in data) {
        const companyName = data.updatedCompany.name;
        const companyIndex = state.companies.findIndex(company => company.name === companyName);
        let updatedCompanies = state.companies;
        updatedCompanies[companyIndex] = data.updatedCompany;

        return { ...state, companies: updatedCompanies };
      } else if ("promotedCompanyUnit" in data) {
        console.log(data.promotedCompanyUnit);
        return { ...state };
      }

      return { ...state };
    }

    case DISCONNECT:
      return { ...state, companies: [] };

    default:
      return state;
  }
}
