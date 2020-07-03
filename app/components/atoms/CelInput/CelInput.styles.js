import { Platform, StyleSheet } from "react-native";
import {
  getPadding,
  getThemedStyle,
  getScaledFont,
  getFontFamily,
  getColor,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const fontSize = getScaledFont(STYLES.FONTSIZE.H4);
const base = {
  container: {
    borderRadius: 8,
  },
  fullScreen: {
    width: "100%",
  },
  trans: {
    backgroundColor: "transparent",
  },
  inputWrapper: {
    ...StyleSheet.flatten(getPadding("0 16 0 16")),
    height: 50,
    borderRadius: 8,
    backgroundColor: getColor(COLOR_KEYS.CARDS),
    ...Platform.select({
      android: {
        ...STYLES.ANDROID_BORDER_STYLES,
        borderColor: "transparent",
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },
  input: {
    height: 50,
    fontSize,
    fontFamily: getFontFamily("light"),
    color: getColor(COLOR_KEYS.HEADLINE),
  },
  disabledInput: {
    opacity: 0.6,
  },
  activeInput: {
    borderWidth: 1,
    borderColor: STYLES.COLORS.DARK_GRAY_OPACITY,
    shadowOpacity: 0,
  },
  borderView: {
    borderColor: "#E9E9E9",
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 2,
  },
  rightText: {
    position: "absolute",
    right: 10,
    top: 12,
    height: 23,
    color: getColor(COLOR_KEYS.PARAGRAPH),
  },
  textPlaceholderColor: {
    color: getColor(COLOR_KEYS.PARAGRAPH),
  },
};

const themed = {
  light: {
    inputWrapper: { backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT) },
    activeInput: { borderColor: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
    input: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT),
      fontFamily: getFontFamily("light", "Barlow"),
    },
    rightText: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
    textPlaceholderColor: {
      color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT),
    },
  },

  dark: {
    inputWrapper: { backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK) },
    activeInput: { borderColor: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
    input: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK),
      fontFamily: getFontFamily("light", "Barlow"),
    },
    rightText: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
    textPlaceholderColor: {
      color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK),
    },
  },

  unicorn: {
    inputWrapper: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
    },
    activeInput: { borderColor: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
    input: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN),
      fontFamily: getFontFamily("light", "Pangram"),
    },
    rightText: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
    textPlaceholderColor: {
      color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN),
    },
  },
};

const CelInputStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelInputStyle;
