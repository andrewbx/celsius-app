import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: widthPercentageToDP("25%"),
    height: widthPercentageToDP("25%"),
    borderRadius: widthPercentageToDP("25%") / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: COLOR_KEYS.CARDS,
  },
  image: {
    width: widthPercentageToDP("10%"),
    height: heightPercentageToDP("4%"),
    resizeMode: "contain",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const EmptyStateStyle = () => getThemedStyle(base, themed);

export default EmptyStateStyle;
