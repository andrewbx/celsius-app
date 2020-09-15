import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  innerCircle: {
    position: "absolute",
    top: heightPercentageToDP("0.6%"),
    left: heightPercentageToDP("0.5%"),
    width: heightPercentageToDP("13.8%"),
    height: heightPercentageToDP("13.8%"),
    borderRadius: heightPercentageToDP("13.8%") / 2,
  },
  contentCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: heightPercentageToDP("1.5%"),
    left: heightPercentageToDP("1.45%"),
    width: heightPercentageToDP("12.1%"),
    height: heightPercentageToDP("12.1%"),
    borderRadius: heightPercentageToDP("12.1%") / 2,
  },
  progressBackground: {
    backgroundColor: COLOR_KEYS.CARDS,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CircularProgressBarStyle = () => getThemedStyle(base, themed);

export default CircularProgressBarStyle;
