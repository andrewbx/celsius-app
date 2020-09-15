import {
  Dimensions,
  PixelRatio,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import _ from "lodash";

import formatter from "./formatter";
import store from "../redux/store";
import appUtil from "./app-util";
import { COLOR_KEYS, COLOR_FAMILY } from "../constants/COLORS";
import { THEMES } from "../constants/UI";
import FONTS from "../constants/FONTS";

const { width, height } = Dimensions.get("window");

export {
  getMargins,
  getPadding,
  widthPercentageToDP,
  heightPercentageToDP,
  getScaledFont,
  getFontFamily,
  getThemeFontFamily,
  getFontSize,
  disableAccessibilityFontScaling,
  getTheme,
  addThemeToComponents,
  getThemedStyle,
  getColor,
};

/**
 * Formats margins from CSS style declaration
 *
 * @param {string} margin - eg. '10 20 10 20'
 * @returns {Object}
 */
function getMargins(margin) {
  if (!margin) return getMargins("0 0 0 0");

  const margins = margin.split(" ");
  if (margins.length !== 4) return getMargins();

  return StyleSheet.create({
    margins: {
      marginTop: Number(margins[0]),
      marginRight: Number(margins[1]),
      marginBottom: Number(margins[2]),
      marginLeft: Number(margins[3]),
    },
  }).margins;
}

/**
 * Formats padding from CSS style declaration
 *
 * @param {string} padding - eg. '10 20 10 20'
 * @returns {Object}
 */
function getPadding(padding) {
  if (!padding) return getPadding("0 0 0 0");

  const paddings = padding.split(" ");
  if (paddings.length !== 4) return getPadding();

  return StyleSheet.create({
    paddings: {
      paddingTop: Number(paddings[0]),
      paddingRight: Number(paddings[1]),
      paddingBottom: Number(paddings[2]),
      paddingLeft: Number(paddings[3]),
    },
  }).paddings;
}

/**
 * Sets theme styles for component
 *
 * @param {Object} base - base styles for component
 * @param {Object} themed - styles for all themes
 * @param {string} theme - current active theme
 * @returns {Object} themed styles
 */
function getThemedStyle(
  base,
  themed,
  theme = store.getState().user.appSettings.theme
) {
  const combinedStyles = formatter.deepmerge(
    setColors(base, theme),
    themed[theme] || themed.light
  );
  return StyleSheet.create(combinedStyles);
}

/**
 * Sets colors for specific COLOR_KEY
 *
 * @param {Object} baseStyle - base styles for component
 * @param {string} theme - one of THEMES
 * @returns {Object} stylesWithColors
 */
function setColors(baseStyle, theme) {
  const stylesWithColors = _.cloneDeep(baseStyle);
  // gets all elements specified in base styles (eg. container)
  const elements = Object.keys(baseStyle);
  // gets array of all color keys
  const colorKeys = Object.values(COLOR_KEYS);

  elements.forEach(el => {
    // gets array of all style properties for specific element (eg. backgroundColor, borderWidth...)
    const styleProps = Object.keys(baseStyle[el]);

    styleProps.forEach(sp => {
      // if style property value is in the colorKeys array
      if (colorKeys.includes(stylesWithColors[el][sp])) {
        // replace it with the correct color for specific key and theme
        stylesWithColors[el][sp] = getColor(stylesWithColors[el][sp], theme);
      }
    });
  });

  return stylesWithColors;
}

/**
 * Sets theme styles for component
 *
 * @param {string} colorKey - color key
 * @param {string} theme - current active theme
 * @returns {Object} themed styles
 */
function getColor(colorKey, theme = getTheme()) {
  return COLOR_FAMILY[theme][colorKey];
}

/**
 * Return current theme
 */
function getTheme() {
  return store.getState().user.appSettings.theme;
}

/**
 * Disables native font scaling from device accessibility settings
 */
function disableAccessibilityFontScaling() {
  // disables letter sizing in phone's Accessibility menu
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;

  // same same as with Text, but different
  if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

/**
 * Calculates screen percentage in pixels from device width
 *
 * @param {number} widthPercent
 * @returns {number}
 */
function widthPercentageToDP(widthPercent) {
  const screenWidth = width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
}

/**
 * Calculates screen percentage in pixels from device height
 *
 * @param {number} heightPercent
 * @returns {number}
 */
function heightPercentageToDP(heightPercent) {
  const screenHeight = height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
}

/**
 * Gets scaled font size for different devices or different themes
 *
 * @param {number} fontSize
 * @returns {number}
 */

function getScaledFont(fontSize) {
  const scale = width / 320;
  const newSize = fontSize * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

/**
 * Gets font family based on theme and weight
 *
 * @param {string} weight - check CelText weight properties
 * @param {string} overrideFont - override theme font
 * @returns {string} - Barlow-Regular|Pangram-Bold
 */
function getFontFamily(weight = "regular", overrideFont = null) {
  let baseFont = overrideFont;

  if (!baseFont) {
    baseFont = getThemeFontFamily();
  }

  if (baseFont === "RobotoMono") {
    return "RobotoMono-Regular";
  }

  const fontWeight = FONTS[`FONT_WEIGHTS_${baseFont.toUpperCase()}`][weight];
  const fontFamily = `${baseFont}${fontWeight}`;

  return fontFamily;
}

/**
 * Gets font family based on them
 *
 * @returns {string} - Barlow|Pangram
 */
function getThemeFontFamily() {
  const theme = getTheme();

  switch (theme) {
    case THEMES.UNICORN:
    default:
      return "Pangram";

    case THEMES.LIGHT:
    case THEMES.DARK:
      return "Barlow";
  }
}

/**
 * Gets scaled font size type
 *
 * @param {string} type - H0|H1|H2...H8
 * @param {string} overrideFont - override theme font
 * @returns {number}
 */
function getFontSize(type = "H5", overrideFont = null) {
  let baseFont = overrideFont;

  if (!baseFont) {
    baseFont = getThemeFontFamily();
  }

  const fontSizes =
    FONTS[`FONT_SIZES_${baseFont.toUpperCase()}`] || FONTS.FONT_SIZES_BARLOW;
  const fontSize = fontSizes[type];
  return fontSize;
}

/**
 * Add theme to all nested element for given component types
 *
 * @param {Array} children - array of react children elements
 * @param {Array} components - string list of react children elements,
 * need to use displayName, because string 'CelText' get minified in standalone app
 * @param {String} theme
 * @returns {number}
 */
function addThemeToComponents(children, components, theme) {
  return appUtil.recursiveMap(children, child =>
    components.includes(child.type.displayName)
      ? React.cloneElement(child, { theme })
      : child
  );
}
