import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  tabs: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: widthPercentageToDP("5.33%"),
    marginTop: heightPercentageToDP("3.02%"),
  },
  activeTabContent: {
    flex: 0.7,
    flexDirection: "column",
  },
  underlineActive: {
    flex: 0.1,
    marginTop: 5,
    marginBottom: 10,
    width: widthPercentageToDP("3.5%"),
    borderTopColor: COLOR_KEYS.LINK,
    borderTopWidth: 1,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CelTabsStyle = () => getThemedStyle(base, themed);

export default CelTabsStyle;
