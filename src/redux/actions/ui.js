import { SET_THEME, THUMBNAIL_SWITCHER } from "./types";

export function setTheme(type) {
  return { type: SET_THEME, payload: type };
}

export function thumbnailSwitcher(switchID) {
  return { type: THUMBNAIL_SWITCHER, payload: switchID };
}
