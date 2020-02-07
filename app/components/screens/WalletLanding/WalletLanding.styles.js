import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  // coinsTextGrid: {
  //   marginTop: '35%',
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   justifyContent: 'space-between'
  //
  // },
  //
  // coinsTextList: {
  //   marginTop: '15%',
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   // justifyContent: 'space-between'
  // },
  depositWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  depositedCoins: {
    alignSelf: "center",
    marginTop: 20
  },
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 6
  },
  listView: {
    marginLeft: 16
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const WalletLandingStyle = () => getThemedStyle(base, themed);

export default WalletLandingStyle;
