import { THEMES } from "./UI";
import STYLES from "./STYLES";

export const COLOR_KEYS = {
  TRANSPARENT: "transparent",
  HEADER: "header",
  BACKGROUND: "background",
  NEUTRAL: "neutral",
  NEUTRAL_LIGHT: "neutral_light",
  NEUTRAL_DARK: "neutral_dark",
  PRIMARY: "primary",
  PRIMARY_LIGHT: "primary_light",
  DISABLED: "disabled",
  HEADING_TEXT: "heading_text",
  HEADING_LIGHT_TEXT: "heading_light_text",
  SUBHEADING_TEXT: "subheading_text",
  SUBHEADING_LIGHT_TEXT: "subheading_light_text",
  BODY_TEXT: "body_text",
  BODY_LIGHT_TEXT: "body_light_text",
  FOOTER_TEXT: "footer_text",
  FAILURE: "failure",
  FAILURE_LIGHT: "failure_light",
  WARNING: "warning",
  WARNING_DARK: "warning_dark",
  OVERLAY: "overlay",
  INFO: "info",
  SUCCESS: "success",
  SUCCESS_LIGHT: "success_light",
  PRIMARY_BUTTON: "primary_button",
  PRIMARY_BUTTON_FOREGROUND: "primary_button_foreground",
  FAB_BUTTON_LIGHT_MODE_SHADOW: "fab_button_light_mode_shadow",
  FAB_BUTTON_DARK_MODE_SHADOW: "fab_button_dark_mode_shadow",
  LIGHT_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR:
    "light_modal_android_outside_background_color",
  DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR:
    "dark_modal_android_outside_background_color",
  TOGGLE_FOREGROUND: "toggle_foreground",
  TOGGLE_BACKGROUND: "toggle_background",
};

export const COLORS = {
  [THEMES.UNICORN]: {
    [COLOR_KEYS.TRANSPARENT]: STYLES.COLORS.TRANSPARENT, // "rgba(0,0,0,0)",
    [COLOR_KEYS.HEADER]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.BACKGROUND]: STYLES.COLORS.DARK_BACKGROUND, // "#151E27",
    [COLOR_KEYS.NEUTRAL]: STYLES.COLORS.WHITE, // "#FFF",
    [COLOR_KEYS.NEUTRAL_LIGHT]: STYLES.COLORS.WHITE_OPACITY5, // "rgba(255,255,255,0.5)",
    [COLOR_KEYS.NEUTRAL_DARK]: STYLES.COLORS.WHITE_OPACITY3, // "rgba(255,255,255,0.3)",
    [COLOR_KEYS.PRIMARY]: STYLES.COLORS.CELSIUS_BLUE, // "#4156A6",
    [COLOR_KEYS.PRIMARY_LIGHT]: STYLES.COLORS.CELSIUS_BLUE_OPACITY5, // "rgba(65,86,166,0.5)",
    [COLOR_KEYS.DISABLED]: STYLES.COLORS.MEDIUM_GRAY5, // "rgba(115,122,130,0.5)",
    [COLOR_KEYS.HEADING_TEXT]: STYLES.COLORS.DARK_GRAY, // "#3D4853",
    [COLOR_KEYS.HEADING_LIGHT_TEXT]: STYLES.COLORS.LIGHT_GRAY, // "#F3F3F3",
    [COLOR_KEYS.SUBHEADING_TEXT]: STYLES.COLORS.SEMI_GRAY, // "#344352",
    [COLOR_KEYS.SUBHEADING_LIGHT_TEXT]: STYLES.COLORS.GRAY, // "#BBBFC2",
    [COLOR_KEYS.BODY_TEXT]: STYLES.COLORS.MEDIUM_GRAY, // "#737A82",
    [COLOR_KEYS.BODY_LIGHT_TEXT]: STYLES.COLORS.MEDIUM_GRAY3, // "rgba(115,122,130,0.3)",
    [COLOR_KEYS.FOOTER_TEXT]: STYLES.COLORS.LIGHT_GRAY, // "#F3F3F3",
    [COLOR_KEYS.FAILURE]: STYLES.COLORS.RED, // "#EF461A",
    [COLOR_KEYS.FAILURE_LIGHT]: STYLES.COLORS.RED_OPACITY2, // "rgba(239,70,26,0.2)",
    [COLOR_KEYS.WARNING]: STYLES.COLORS.ORANGE, // "#E19F30",
    [COLOR_KEYS.WARNING_DARK]: STYLES.COLORS.ORANGE_DARK, // "#E87325",
    [COLOR_KEYS.OVERLAY]: STYLES.COLORS.DARK_OVERLAY, // "rgba(21,30,39,0.9)",
    [COLOR_KEYS.INFO]: STYLES.COLORS.DARK_GRAY_OPACITY, // "rgba(61,72,83,0.15)",
    [COLOR_KEYS.SUCCESS]: STYLES.COLORS.GREEN, // "#4FB895",
    [COLOR_KEYS.SUCCESS_LIGHT]: STYLES.COLORS.GREEN_OPACITY, // "rgba(79,184,149,0.15)",
    [COLOR_KEYS.PRIMARY_BUTTON]: STYLES.COLORS.CELSIUS_BLUE,
    [COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND]: STYLES.COLORS.WHITE,
    [COLOR_KEYS.FAB_BUTTON_LIGHT_MODE_SHADOW]:
      STYLES.COLORS.FAB_BUTTON_LIGHT_MODE_SHADOW, // "rgba(20,32,80,0.4)",
    [COLOR_KEYS.FAB_BUTTON_DARK_MODE_SHADOW]:
      STYLES.COLORS.FAB_BUTTON_DARK_MODE_SHADOW, // "rgba(0,0,0,0.2)",
    [COLOR_KEYS.LIGHT_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR]:
      STYLES.COLORS.DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR, // "rgba(21,29,37,0.92)",
    [COLOR_KEYS.DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR]:
      STYLES.COLORS.DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR, // "rgba(21,30,39,0.95)",
    [COLOR_KEYS.TOGGLE_FOREGROUND]: STYLES.COLORS.DARK_TOGGLE_FOREGROUND, // "#79828B",
    [COLOR_KEYS.TOGGLE_BACKGROUND]: STYLES.COLORS.DARK_TOGGLE_BACKGROUND, // "#404D59",
  },

  [THEMES.DARK]: {
    [COLOR_KEYS.TRANSPARENT]: STYLES.COLORS.TRANSPARENT, // "rgba(0,0,0,0)",
    [COLOR_KEYS.HEADER]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.BACKGROUND]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.NEUTRAL]: STYLES.COLORS.WHITE, // "#FFF",
    [COLOR_KEYS.NEUTRAL_LIGHT]: STYLES.COLORS.WHITE_OPACITY5, // "rgba(255,255,255,0.5)",
    [COLOR_KEYS.NEUTRAL_DARK]: STYLES.COLORS.WHITE_OPACITY3, // "rgba(255,255,255,0.3)",
    [COLOR_KEYS.PRIMARY]: "rgba(0,0,0,0)",
    [COLOR_KEYS.PRIMARY_LIGHT]: "rgba(12,23,102,0.5)",
    [COLOR_KEYS.DISABLED]: "rgba(130,131,142,0.5)",
    [COLOR_KEYS.HEADING_TEXT]: "#3E3B4C",
    [COLOR_KEYS.HEADING_LIGHT_TEXT]: STYLES.COLORS.LIGHT_GRAY, // "#F3F3F3",
    [COLOR_KEYS.SUBHEADING_TEXT]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.SUBHEADING_LIGHT_TEXT]: "#BBBFC5",
    [COLOR_KEYS.BODY_TEXT]: "#82838E",
    [COLOR_KEYS.BODY_LIGHT_TEXT]: "rgba(130,131,142,0.3)",
    [COLOR_KEYS.FOOTER_TEXT]: "#E9EFF3",
    [COLOR_KEYS.FAILURE]: STYLES.COLORS.RED, // "#EF461A",
    [COLOR_KEYS.FAILURE_LIGHT]: STYLES.COLORS.RED_OPACITY2, // "rgba(239,70,26,0.2)",
    [COLOR_KEYS.WARNING]: STYLES.COLORS.ORANGE, // "#E19F30",
    [COLOR_KEYS.WARNING_DARK]: STYLES.COLORS.ORANGE_DARK, // "#E87325",
    [COLOR_KEYS.OVERLAY]: "rgba(16,11,32,0.9)",
    [COLOR_KEYS.INFO]: "rgba(62,59,76,0.15)",
    [COLOR_KEYS.SUCCESS]: "#76A470",
    [COLOR_KEYS.SUCCESS_LIGHT]: "rgba(118,164,112,0.15)",
    [COLOR_KEYS.PRIMARY_BUTTON]: "#4156A6",
    [COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND]: "#FFF",
    [COLOR_KEYS.FAB_BUTTON_LIGHT_MODE_SHADOW]: "rgba(16,11,32,0.4)",
    [COLOR_KEYS.FAB_BUTTON_DARK_MODE_SHADOW]: "rgba(16,11,32,0.2)",
    [COLOR_KEYS.LIGHT_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR]:
      "rgba(16,11,32,0.9)",
    [COLOR_KEYS.DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR]:
      "rgba(16,11,32,0.9)",
    [COLOR_KEYS.TOGGLE_FOREGROUND]: "#82838E",
    [COLOR_KEYS.TOGGLE_BACKGROUND]: "#3E3B4C",
  },

  [THEMES.LIGHT]: {
    // ovo je UNICORN
    [COLOR_KEYS.TRANSPARENT]: STYLES.COLORS.TRANSPARENT, // "rgba(0,0,0,0)",
    [COLOR_KEYS.HEADER]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.BACKGROUND]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.NEUTRAL]: STYLES.COLORS.WHITE, // "#FFF",
    [COLOR_KEYS.NEUTRAL_LIGHT]: STYLES.COLORS.WHITE_OPACITY5, // "rgba(255,255,255,0.5)",
    [COLOR_KEYS.NEUTRAL_DARK]: STYLES.COLORS.WHITE_OPACITY3, // "rgba(255,255,255,0.3)",
    [COLOR_KEYS.PRIMARY]: "#0C1766",
    [COLOR_KEYS.PRIMARY_LIGHT]: "rgba(12,23,102,0.5)",
    [COLOR_KEYS.DISABLED]: "rgba(130,131,142,0.5)",
    [COLOR_KEYS.HEADING_TEXT]: "#0C1766",
    [COLOR_KEYS.HEADING_LIGHT_TEXT]: STYLES.COLORS.LIGHT_GRAY, // "#F3F3F3",
    [COLOR_KEYS.SUBHEADING_TEXT]: STYLES.COLORS.DARK_HEADER, // "#1F2E3D",
    [COLOR_KEYS.SUBHEADING_LIGHT_TEXT]: "#BBBFC5",
    [COLOR_KEYS.BODY_TEXT]: "#82838E",
    [COLOR_KEYS.BODY_LIGHT_TEXT]: "rgba(130,131,142,0.3)",
    [COLOR_KEYS.FOOTER_TEXT]: "#E9EFF3",
    [COLOR_KEYS.FAILURE]: STYLES.COLORS.RED, // "#EF461A",
    [COLOR_KEYS.FAILURE_LIGHT]: STYLES.COLORS.RED_OPACITY2, // "rgba(239,70,26,0.2)",
    [COLOR_KEYS.WARNING]: STYLES.COLORS.ORANGE, // "#E19F30",
    [COLOR_KEYS.WARNING_DARK]: STYLES.COLORS.ORANGE_DARK, // "#E87325",
    [COLOR_KEYS.OVERLAY]: "rgba(16,11,32,0.9)",
    [COLOR_KEYS.INFO]: "rgba(62,59,76,0.15)",
    [COLOR_KEYS.SUCCESS]: "#76A470",
    [COLOR_KEYS.SUCCESS_LIGHT]: "rgba(118,164,112,0.15)",
    [COLOR_KEYS.PRIMARY_BUTTON]: "#CD8A70",
    [COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND]: "#0E1762",
    [COLOR_KEYS.FAB_BUTTON_LIGHT_MODE_SHADOW]: "rgba(16,11,32,0.4)",
    [COLOR_KEYS.FAB_BUTTON_DARK_MODE_SHADOW]: "rgba(16,11,32,0.2)",
    [COLOR_KEYS.LIGHT_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR]:
      "rgba(16,11,32,0.9)",
    [COLOR_KEYS.DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR]:
      "rgba(16,11,32,0.9)",
    [COLOR_KEYS.TOGGLE_FOREGROUND]: "#82838E",
    [COLOR_KEYS.TOGGLE_BACKGROUND]: "#3E3B4C",
  },
};
