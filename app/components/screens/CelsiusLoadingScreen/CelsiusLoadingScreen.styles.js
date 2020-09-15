import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const { width, height } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
  spinContainer: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
  logoImage: {
    flex: 1,
    width: 70,
    height: 70,
    marginLeft: -35,
    marginTop: -35,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CelsiusLoadingScreenStyle = () => getThemedStyle(base, themed);

export default CelsiusLoadingScreenStyle;
