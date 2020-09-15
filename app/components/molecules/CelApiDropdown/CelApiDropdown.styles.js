import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  dropDown: { marginBottom: 20, width: widthPercentageToDP("90%") },
  normalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    paddingTop: 12,
    paddingLeft: 12,
    backgroundColor: COLOR_KEYS.CARDS,
  },
  valueIcon: {
    flexDirection: "row",
  },
  valueIconRight: {
    marginTop: 6,
    marginRight: 6,
  },
  largeButton: {
    flexDirection: "row",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    width: "100%",
  },
  iconLeft: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginLeft: 10,
  },
  buttonTextWrapper: {
    flexDirection: "column",
    width: "70%",
    justifyContent: "center",
  },
  activeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  largeButtonRightIcon: {
    marginTop: 5,
  },
  expand: {
    backgroundColor: COLOR_KEYS.CARDS,
    padding: 14,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CelApiDropdownStyle = () => getThemedStyle(base, themed);

export default CelApiDropdownStyle;
