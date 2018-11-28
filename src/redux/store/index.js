import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import apiMiddleware from "../middleware/api";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

export default store;
