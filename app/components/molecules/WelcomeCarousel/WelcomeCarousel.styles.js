import { Dimensions, StyleSheet } from "react-native";
import { FONT_SCALE, STYLES } from "../../../config/constants/style";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";

const SCREEN_WIDTH = Dimensions.get("window").width;

const WelcomeCarouselStyle = StyleSheet.create({

  scrollPage: {
    width: SCREEN_WIDTH - 80,
    alignItems: "center"
  },
  title: {
    fontFamily: "agile-extra-bold",
    fontSize: FONT_SCALE * 42,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: heightPercentageToDP("10%"),
    marginBottom: heightPercentageToDP("1.97%")
  },
  contentWrapper: {
    height: heightPercentageToDP("40.4%"),
    marginTop: heightPercentageToDP("8.62%"),
    width: SCREEN_WIDTH - 80,
    alignItems:"center"
  },
  smallDescription: {
    fontFamily: "agile-bold",
    fontSize: FONT_SCALE * 16,
    color: "#88A2C7",
    marginBottom: heightPercentageToDP("0.74%"),
    textAlign: "center"
  },
  largeDescription: {
    fontFamily: "agile-light",
    fontSize: FONT_SCALE * 18,
    color: STYLES.WHITE_TEXT_COLOR,
    textAlign: "center",
    marginBottom: heightPercentageToDP("2.22%")
  },
  disclaimer: {
    fontSize: FONT_SCALE * 16,
    fontFamily: 'agile-light-italic',
    color: "rgba(136,162,199,1)",
    textAlign: "center",
    marginBottom: heightPercentageToDP("2.34%")
  },
  circle: {
    margin: widthPercentageToDP("3.2%"),
    width: heightPercentageToDP("0.99%"),
    height: heightPercentageToDP("0.99%"),
    borderRadius: heightPercentageToDP("0.99%") / 2,
    backgroundColor: "rgba(255,255,255,1)"
  },
  circleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: heightPercentageToDP("1.93%"),
    left: (SCREEN_WIDTH - 80) / 2 - 48,
    top: heightPercentageToDP("48%")

  },
  table: {
    marginTop: heightPercentageToDP("8.62%"),
    height: heightPercentageToDP("40.4%")
  }
});

export default WelcomeCarouselStyle;
