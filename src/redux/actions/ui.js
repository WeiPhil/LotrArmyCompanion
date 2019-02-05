import { SET_THEME, THUMBNAIL_SWITCHER, LOADING_SCREEN_ON, LOADING_SCREEN_OFF } from "./types";

export function setTheme(type) {
  return { type: SET_THEME, payload: type };
}

export function thumbnailSwitcher(switchID) {
  return { type: THUMBNAIL_SWITCHER, payload: switchID };
}

export function loadingScreenOn() {
  return { type: LOADING_SCREEN_ON };
}

export function loadingScreenOff() {
  return { type: LOADING_SCREEN_OFF };
}
