import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import apiMiddleware from "../middleware/api";
import createSocketMiddleware from "../middleware/socket";

import { persistReducer, persistStore } from "redux-persist";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { HOST_NAME } from "../../utils/Constants";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  whitelist: ["ui", "auth", "chat"]
};

const socketUrl = "http://" + HOST_NAME + ":3231";

// needed for redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, composeEnhancers(applyMiddleware(apiMiddleware, createSocketMiddleware(socketUrl))));

export const persistor = persistStore(store);
