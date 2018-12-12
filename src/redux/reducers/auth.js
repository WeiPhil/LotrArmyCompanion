import {
  API_START,
  API_END,
  CONFLICT,
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLOSE_REGISTER_SUCCESS_DIALOG,
  INTERNAL_ERROR_HANDLED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/types";

const authInitialState = {
  loggedIn: false,
  username: undefined,
  registering: false,
  logging: false,
  registerInfoMessage: "",
  registerSuccess: false,
  internalErrorCode: 0
};

export default function authReducer(state = authInitialState, action) {
  //   console.log("Auth action type => ", action.type);
  switch (action.type) {
    case API_START:
      if (action.payload === REGISTER_USER) {
        return { ...state, registering: true };
      } else if (action.payload === LOGIN_USER) {
        return { ...state, logging: true };
      } else {
        return state;
      }

    case API_END:
      if (action.payload === REGISTER_USER) {
        return { ...state, registering: false };
      } else if (action.payload === LOGIN_USER) {
        return { ...state, logging: false };
      } else {
        return state;
      }

    case CONFLICT:
      switch (action.payload.data.internalErrorCode) {
        case 101:
          return { ...state, registerInfoMessage: "That username is already used", internalErrorCode: 101 };
        case 102:
          return { ...state, registerInfoMessage: "That email is already used", internalErrorCode: 102 };
        default:
          return state;
      }

    case INTERNAL_ERROR_HANDLED:
      return { ...state, registerInfoMessage: "", internalErrorCode: 0 };

    case REGISTER_SUCCESS:
      return { ...state, registerInfoMessage: action.payload, registerSuccess: true };

    case CLOSE_REGISTER_SUCCESS_DIALOG:
      return { ...state, registerInfoMessage: "", registerSuccess: false };

    case REGISTER_FAILURE:
      return { ...state, registerInfoMessage: action.payload, registerSuccess: false };

    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, username: action.payload };

    case LOGIN_FAILURE:
      return { ...state, loggedIn: false, username: action.payload };

    default:
      return state;
  }
}
