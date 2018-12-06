import { GET_ARMIES, GET_USER_COMPANIES, ON_GET_ERROR } from "./types";

import { apiAction } from "./api";
import { setUserCompanies, setArmies } from "./data";

//192.168.1.4
// use public ip to access from same network
/** API based actions */
export function getUserCompanies(/*user*/) {
  return apiAction({
    url: "http://localhost:5000/getCompany/admin", //+"/"+user LATER
    onSuccess: setUserCompanies,
    onFailure: error => ({ type: ON_GET_ERROR, payload: error }),
    label: GET_USER_COMPANIES
  });
}

export function getArmies() {
  return apiAction({
    url: "http://localhost:5000/getArmies",
    onSuccess: setArmies,
    onFailure: error => ({ type: ON_GET_ERROR, payload: error }),
    label: GET_ARMIES
  });
}
