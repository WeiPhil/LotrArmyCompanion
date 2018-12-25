import dataReducer from "./data";
import uiReducer from "./ui";
import databaseAccessReducer from "./databaseAccess";
import authReducer from "./auth";
import chatReducer from "./chat";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
  databaseAccess: databaseAccessReducer,
  auth: authReducer,
  chat: chatReducer
});

export default rootReducer;
