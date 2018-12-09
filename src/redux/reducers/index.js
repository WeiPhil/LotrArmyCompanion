import dataReducer from "./data";
import uiReducer from "./ui";
import serverAccessReducer from "./serverAccess";
import authReducer from "./auth";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
  serverAccess: serverAccessReducer,
  auth: authReducer
});

export default rootReducer;
