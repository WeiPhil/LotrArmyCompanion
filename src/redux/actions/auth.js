import {
  INTERNAL_ERROR_HANDLED,
  CLOSE_REGISTER_SUCCESS_DIALOG,
  REGISTER_USER,
  LOGIN_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/types";

import { apiAction } from "./api";

/**
 * user : { username : string, password : string }
 *
 * **/

export function register(userData) {
  return apiAction({
    url: "http://localhost:5000/register",
    method: "POST",
    data: userData,
    onSuccess: data => ({ type: REGISTER_SUCCESS, payload: data }),
    onFailure: error => ({ type: REGISTER_FAILURE, payload: error }),
    label: REGISTER_USER
  });
}

export function closeRegisterSuccessDialog() {
  return { type: CLOSE_REGISTER_SUCCESS_DIALOG };
}

export function internalErrorHandled() {
  return { type: INTERNAL_ERROR_HANDLED };
}

export function login(userData) {
  return apiAction({
    url: "http://localhost:5000/login",
    method: "POST",
    data: userData,
    onSuccess: data => ({ type: LOGIN_SUCCESS, payload: data }),
    onFailure: error => ({ type: LOGIN_FAILURE, payload: error }),
    label: LOGIN_USER
  });
}
