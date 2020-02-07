// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  cardWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.25,
  },
  image: {
    width: widthPercentageToDP("9%"),
    height: heightPercentageToDP("5.3%"),
    resizeMode: "contain",
  },
  explanationWrapper: {
    flex: 0.75,
  },
  active: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  chevronStyle: {
    marginLeft: 8,
    marginBottom: heightPercentageToDP("0.08%"),
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const MultiInfoCardStyle = () => getThemedStyle(base, themed);

export default MultiInfoCardStyle;