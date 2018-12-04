import dataReducer from "./data";
import uiReducer from "./ui";
import serverAccessReducer from "./serverAccess";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
  serverAccess: serverAccessReducer
});

export default rootReducer;
