export const HOST_NAME = window.location.hostname;
export const WEBSERVER_PORT = process.env.NODE_ENV === "development" ? 3131 : 3000;

// List of constants used throughout the app
export const MENU_WIDTH = 280;
export const REACTION_TIMEOUT = 250;

// Constants for core app style
export const CARD_MAX_WIDTH = 360;

export const CARD_IMAGE_HEIGHT = 100;

export const TUMBNAIL_CARD_SIZE = 100;

export const FORM_FIELD_WIDTH = 400;
// Madia query constants
export const MIN_HEIGHT_600 = "(min-height: 600px)";

// Constants for core app programm

//Menu constants
export const NEW_BATTLE = 0;
export const MY_COMPANIES = 1;
export const ARMY_OVERVIEW = 2;
export const BUY_TROOPS = 3;
export const WIKI = 4;

//Database constants
export const HERO = "hero";
export const WARRIOR = "warrior";
export const LIEUTENANT = "lieutenant";
export const SERGEANT = "sergeant";
