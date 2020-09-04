import {
  getThemedStyle,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -20,
    marginLeft: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 15,
  },
  gauge: {
    width: widthPercentageToDP("28%"),
    height: heightPercentageToDP("10%"),
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const SecurityScoreGaugeStyle = () => getThemedStyle(base, themed);

export default SecurityScoreGaugeStyle;
