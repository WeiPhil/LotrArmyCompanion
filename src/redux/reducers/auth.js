import { SUCCESS_LOGIN, DISCONNECT } from "../actions/types";

const authInitialState = {
  loggedIn: false,
  username: undefined
};

export default function authReducer(state = authInitialState, action) {
  //   console.log("Auth action type => ", action.type);
  switch (action.type) {
    case SUCCESS_LOGIN:
      return { ...state, loggedIn: true, username: action.username };

    case DISCONNECT:
      return { ...state, loggedIn: false, username: undefined };

    default:
      return state;
  }
}
