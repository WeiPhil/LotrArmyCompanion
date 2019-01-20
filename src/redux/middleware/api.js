// inspired by https://leanpub.com/redux-book
import axios from "axios";
import { API } from "../actions/types";
import { conflict, accessDenied, apiStart, apiEnd } from "../actions/api";

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API) return;

  const { url, method, data, accessToken, onSuccess, onFailure, label, headersOverride } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  const headers = headersOverride == null ? axios.defaults.headers.common : headersOverride;

  if (label) {
    dispatch(apiStart(label));
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(onFailure(error));
      console.log(error);

      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
      if (error.response && error.response.status === 409) {
        dispatch(conflict(error.response));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
