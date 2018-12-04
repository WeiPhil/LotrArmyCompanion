import { SET_THEME } from "./types";

export function setTheme(type) {
  return { type: SET_THEME, payload: type };
}
