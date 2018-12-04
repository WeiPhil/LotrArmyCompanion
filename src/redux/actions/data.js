import { ADD_ATTACK_TO, SET_ARMIES, SET_USER_COMPANIES } from "./types";

/** Local Based actions */
export function addAttackTo(who) {
  return { type: ADD_ATTACK_TO, payload: who };
}

export function setArmies(data) {
  return { type: SET_ARMIES, payload: data };
}

export function setUserCompanies(data) {
  return { type: SET_USER_COMPANIES, payload: data };
}
