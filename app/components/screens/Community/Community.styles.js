import { Platform } from "react-native";

import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  text: {
    marginTop: heightPercentageToDP("1.25%"),
  },

  secondText: {
    marginTop: heightPercentageToDP("0.5%"),
  },
  amountsView: {
    flex: 1,
    justifyContent: "space-around",
  },
  amountsCard: {
    marginTop: heightPercentageToDP("2%"),
  },
  image: {
    alignItems: "center",
  },
  communityImage: {
    position: "absolute",
    left: 5,
    bottom: -12,
    resizeMode: "cover",
    height: widthPercentageToDP("35%"),
    width: widthPercentageToDP("30%"),
    overflow: "visible",
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 12,
    marginLeft: 5,
  },
  coinImage: {
    width: 38,
    height: 38,
  },
  bulldogImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    resizeMode: "cover",
    width: widthPercentageToDP("22%"),
    height: widthPercentageToDP("20.4%"),
    overflow: "hidden",
  },
  graphMargin: {
    marginTop:
      Platform.OS === "android"
        ? heightPercentageToDP("-15%")
        : heightPercentageToDP("5%"),
  },
  coinLabel: {
    marginTop: -15,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CommunityStyle = () => getThemedStyle(base, themed);

export default CommunityStyle;
