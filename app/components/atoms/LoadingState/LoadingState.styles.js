import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { height } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 0.8 * height,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const LoadingStateStyle = () => getThemedStyle(base, themed);

export default LoadingStateStyle;
