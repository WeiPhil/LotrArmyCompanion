import { GET_ARMIES, GET_USER_COMPANIES, ON_GET_ERROR, GET_COMPANY_FACTIONS, ADD_COMPANY, ADD_COMPANY_SUCCESS, ADD_COMPANY_FAILURE } from "./types";

import { apiAction } from "./api";
import { setUserCompanies, setArmies, setCompanyFactions } from "./data";

import { HOST_NAME, WEBSERVER_PORT } from "./../../utils/Constants";

// use public ip to access from same network
/** API based actions */
export function getUserCompanies(user, accessToken) {
  return apiAction({
    url: "http://" + HOST_NAME + ":" + WEBSERVER_PORT + "/getCompany/" + user,
    onSuccess: setUserCompanies,
    onFailure: error => ({ type: ON_GET_ERROR, payload: error }),
    accessToken: accessToken,
    label: GET_USER_COMPANIES
  });
}

export function getArmies() {
  return apiAction({
    url: "http://" + HOST_NAME + ":" + WEBSERVER_PORT + "/getArmies",
    onSuccess: setArmies,
    onFailure: error => ({ type: ON_GET_ERROR, payload: error }),
    label: GET_ARMIES
  });
}

export function getCompanyFactions() {
  return apiAction({
    url: "http://" + HOST_NAME + ":" + WEBSERVER_PORT + "/getCompanyFactions",
    onSuccess: setCompanyFactions,
    onFailure: error => ({ type: ON_GET_ERROR, payload: error }),
    label: GET_COMPANY_FACTIONS
  });
}

export function addCompany(companyData) {
  return apiAction({
    url: "http://" + HOST_NAME + ":" + WEBSERVER_PORT + "/addCompany",
    method: "POST",
    data: companyData,
    onSuccess: data => ({ type: ADD_COMPANY_SUCCESS, payload: data }),
    onFailure: error => ({ type: ADD_COMPANY_FAILURE, payload: error }),
    label: ADD_COMPANY
  });
}
