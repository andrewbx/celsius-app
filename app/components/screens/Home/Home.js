import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, ScrollView, SafeAreaView, StatusBar } from "react-native";
import * as appActions from "../../../redux/actions";
import Loader from "../../atoms/Loader/Loader";
import { getPadding } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";
import { THEMES, WELCOME_MESSAGES } from "../../../constants/UI";
import HomeStyle from "./Home.styles";
import appUtil from "../../../utils/app-util";
import { getSecureStoreKey } from "../../../utils/expo-storage";
import Constants from "../../../../constants";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

const { SECURITY_STORAGE_AUTH_KEY } = Constants;

@connect(
  state => ({
    user: state.user.profile,
    callsInProgress: state.api.callsInProgress,
    appSettings: state.user.appSettings,
    bannerProps: state.ui.bannerProps,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  static navigationOptions = () => ({
    header: null,
    gesturesEnabled: false,
  });

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      totalProgress: 6,
      randomMsg:
        WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)],
    };
  }

  async componentDidMount() {
    const { actions } = this.props;
    const { totalProgress } = this.state;

    const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);

    if (!token) {
      return actions.navigateTo("Welcome");
    }

    this.setState({ progress: 1 });

    appUtil.initializeThirdPartyServices();
    this.setState({ progress: 2 });

    await appUtil.checkAndRefreshAuthToken(token);
    this.setState({ progress: 3 });

    await actions.getInitialCelsiusData();
    this.setState({ progress: 4 });

    await actions.getUserAppBootstrap();
    this.setState({ progress: 5 });

    mixpanelAnalytics.sessionStarted("Init app");
    await actions.setBannerProps();
    this.setState({ progress: totalProgress });

    const { user, bannerProps } = this.props;
    if (user.has_pin) {
      return actions.resetToScreen("VerifyProfile", {
        hideBack: true,
        onSuccess: () => {
          actions.setBannerProps({
            sessionCount: bannerProps.sessionCount + 1,
          });
          actions.resetToScreen("WalletLanding");
          actions.handleDeepLink();
        },
      });
    }
  }

  render() {
    const { randomMsg, progress, totalProgress } = this.state;
    const paddings = getPadding("0 20 0 20");
    const style = HomeStyle();

    return (
      <ScrollView contentContainerStyle={[{ flexGrow: 1 }, paddings]}>
        <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
          <StatusBar barStyle="dark-content" />
          <View style={style.contentWrapper}>
            <Image
              source={require("../../../../assets/images/splashScreen-celsius-new.png")}
              style={style.celImage}
            />
            <CelText
              theme={THEMES.LIGHT}
              align={"center"}
              margin={"20 0 10 0"}
              weight={"600"}
              type={"H2"}
            >
              {randomMsg.title}
            </CelText>
            <CelText
              theme={THEMES.LIGHT}
              align={"center"}
              margin={"0 0 20 0"}
              type={"H4"}
              weight={"300"}
            >
              {randomMsg.text}
            </CelText>
            <Loader progress={progress / totalProgress} />
          </View>
          <View style={style.partnerLogos}>
            <Image
              source={require("../../../../assets/images/PartnerLogos/DP.png")}
              style={style.logoMiddle}
            />
            <Image
              source={require("../../../../assets/images/PartnerLogos/litecoin-foundation.png")}
              style={style.logoLeft}
            />
            <Image
              source={require("../../../../assets/images/PartnerLogos/prime-trust-llc-vector-logo.png")}
              style={style.logoRight}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Home;
