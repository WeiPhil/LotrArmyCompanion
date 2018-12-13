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
  LOGIN_FAILURE,
  DISCONNECT
} from "../actions/types";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["accessToken", "loggedIn", "username"]
};

const authInitialState = {
  loggedIn: false,
  username: "",
  registering: false,
  logging: false,
  authMessage: "",
  registerSuccess: false,
  internalErrorCode: 0,
  accessToken: ""
};

const authReducer = (state = authInitialState, action) => {
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
          return { ...state, authMessage: "That username is already used", internalErrorCode: 101 };
        case 102:
          return { ...state, authMessage: "That email is already used", internalErrorCode: 102 };
        case 103:
          return { ...state, authMessage: "That username doesn't exist", internalErrorCode: 103 };
        case 104:
          return { ...state, authMessage: "You entered an incorrect password", internalErrorCode: 104 };
        default:
          return state;
      }

    case INTERNAL_ERROR_HANDLED:
      return { ...state, authMessage: "", internalErrorCode: 0 };

    case REGISTER_SUCCESS:
      return { ...state, authMessage: action.payload, registerSuccess: true };

    case CLOSE_REGISTER_SUCCESS_DIALOG:
      return { ...state, authMessage: "", registerSuccess: false };

    case REGISTER_FAILURE:
      return { ...state, registerSuccess: false };

    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, username: action.payload.username, accessToken: action.payload.accessToken };

    case LOGIN_FAILURE:
      return { ...state, loggedIn: false, username: action.payload };

    case DISCONNECT:
      return { ...state, loggedIn: false, username: "", accessToken: "" };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, authReducer);
