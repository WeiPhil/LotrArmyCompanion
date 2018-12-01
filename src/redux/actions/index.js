import { SET_ARMIES, FETCH_ARMIES, SET_USER_COMPANIES, FETCH_USER_COMPANIES, ON_FETCH_ERROR, API } from "./types";

import { SET_THEME, SET_MENU_STATE, ADD_ATTACK_TO } from "./types";

/** Local Based actions */
export function addAttackTo(who) {
  return { type: ADD_ATTACK_TO, payload: who };
}

export function setMenuState(newState) {
  return { type: SET_MENU_STATE, payload: newState };
}

export function setTheme(type) {
  return { type: SET_THEME, payload: type };
}

//192.168.1.4
/** API based actions */
export function fetchUserCompanies(/*user*/) {
  return apiAction({
    url: "http://192.168.1.4:5000/getCompany", //+"/"+user LATER
    onSuccess: setUserCompanies,
    onFailure: error => ({ type: ON_FETCH_ERROR, payload: error }),
    label: FETCH_USER_COMPANIES
  });
}

function setUserCompanies(data) {
  return { type: SET_USER_COMPANIES, payload: data };
}

export function fetchArmies() {
  return apiAction({
    url: "http://192.168.1.4:5000/getArmies",
    onSuccess: setArmies,
    onFailure: error => ({ type: ON_FETCH_ERROR, payload: error }),
    label: FETCH_ARMIES
  });
}

function setArmies(data) {
  return { type: SET_ARMIES, payload: data };
}

/** API base action DO NOT TOUCH */
function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}
