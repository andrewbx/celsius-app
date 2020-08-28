import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import WalletDetailsCard from "../../organisms/WalletDetailsCard/WalletDetailsCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Icon from "../../atoms/Icon/Icon";
import CelPayReceivedModal from "../../modals/CelPayReceivedModal/CelPayReceivedModal";
import { MODALS, WALLET_LANDING_VIEW_TYPES } from "../../../constants/UI";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import ComingSoonCoins from "../../molecules/ComingSoonCoins/ComingSoonCoins";
import CoinCards from "../../organisms/CoinCards/CoinCards";
import WalletLandingStyle from "./WalletLanding.styles";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import ReferralSendModal from "../../modals/ReferralSendModal/ReferralSendModal";
import RejectionReasonsModal from "../../modals/RejectionReasonsModal/RejectionReasonsModal";
import LoanAlertsModalWrapper from "../../modals/LoanAlertsModals/LoanAlertsModalWrapper";
import BannerCrossroad from "../../organisms/BannerCrossroad/BannerCrossroad";
import CelButton from "../../atoms/CelButton/CelButton";
import { assignPushNotificationToken } from "../../../utils/push-notifications-util";
import HodlModeModal from "../../modals/HodlModeModal/HodlModeModal";
import animationsUtil from "../../../utils/animations-util";
import { COMING_SOON_COINS } from "../../../constants/DATA";

@connect(
  state => {
    const branchTransfer =
      state.branch.transferHash &&
      state.transfers.transfers[state.branch.transferHash]
        ? state.transfers.transfers[state.branch.transferHash]
        : null;

    return {
      branchTransfer,
      appSettings: state.user.appSettings,
      currenciesRates: state.currencies.rates,
      walletSummary: state.wallet.summary,
      currenciesGraphs: state.currencies.graphs,
      user: state.user.profile,
      depositCompliance: state.compliance.deposit,
      rejectionReasons: state.user.profile.kyc
        ? state.user.profile.kyc.rejectionReasons
        : [],
      previouslyOpenedModals: state.ui.previouslyOpenedModals,
      hodlStatus: state.hodl.hodlStatus,
      walletAddresses: state.wallet.addresses,
      userTriggeredActions: state.user.appSettings.user_triggered_actions || {},
      shouldAnimate: state.ui.shouldAnimate,
    };
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletLanding extends Component {
  static propTypes = {};
  static defaultProps = {};
  static walletFetchingInterval;

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params && params.title ? params.title : "Welcome",
      right: "profile",
      hideBack: true,
      gesturesEnabled: false,
    };
  };

  constructor(props) {
    super(props);

    const { navigation } = props;

    navigation.setParams({
      title: `Welcome ${props.user.first_name || ""}!`,
    });

    this.state = {
      activeView: props.appSettings.default_wallet_view,
    };
  }

  componentDidMount = async () => {
    const {
      actions,
      currenciesRates,
      currenciesGraphs,
      previouslyOpenedModals,
      hodlStatus,
    } = this.props;
    actions.changeWalletHeaderContent();
    setTimeout(() => {
      if (
        !previouslyOpenedModals.HODL_MODE_MODAL &&
        hodlStatus.created_by === "backoffice"
      )
        actions.openModal(MODALS.HODL_MODE_MODAL);

      actions.getLoanAlerts();
    }, 2000);

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    await assignPushNotificationToken();

    await actions.getWalletSummary();
    await actions.getLoyaltyInfo();
    if (!currenciesRates) actions.getCurrencyRates();
    if (!currenciesGraphs) actions.getCurrencyGraphs();
    this.setWalletFetchingInterval();
  };

  componentDidUpdate(prevProps) {
    const { isFocused, appSettings } = this.props;

    if (prevProps.isFocused !== isFocused && isFocused === true) {
      this.setWalletFetchingInterval();
    }

    if (
      prevProps.appSettings.default_wallet_view !==
      appSettings.default_wallet_view
    ) {
      this.toggleView(appSettings.default_wallet_view);
    }

    // if (
    //   (prevProps.user && prevProps.user.first_name) !==
    //   (this.props.user && this.props.user.first_name)
    // ) {
    //   navigation.setParams({
    //     title: `Welcome ${this.props.user.first_name}!`
    //   })
    // }

    if (isFocused === false && this.walletFetchingInterval) {
      clearInterval(this.walletFetchingInterval);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    clearInterval(this.walletFetchingInterval);
  }

  setWalletFetchingInterval = () => {
    const { actions } = this.props;

    this.walletFetchingInterval = setInterval(() => {
      actions.getWalletSummary();
    }, 300000);
  };

  pendingAddresses = () => {
    const { walletSummary } = this.props;

    const pendingAddresses =
      walletSummary &&
      walletSummary.coins.filter(
        coin => coin.has_pending_deposit_address_change
      );

    return pendingAddresses || [];
  };

  handleBackButton = () => {};

  toggleView = viewType => {
    this.setState({ activeView: viewType });
  };

  renderComingSoon() {
    const { activeView } = this.state;
    const { shouldAnimate } = this.props;
    const style = WalletLandingStyle();
    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;
    const processedItems = animationsUtil.applyOffset(
      COMING_SOON_COINS,
      isGrid ? 2 : 1
    );

    return (
      <View
        style={[
          style.flexWrapper,
          { flexDirection: isGrid ? "row" : "column" },
        ]}
      >
        {processedItems.map(coin => (
          <ComingSoonCoins
            key={coin.name}
            coin={coin}
            offset={processedItems.offset}
            isGrid={isGrid}
            shouldAnimate={shouldAnimate}
            activeView={activeView}
          />
        ))}
      </View>
    );
  }

  render() {
    const { activeView } = this.state;
    const {
      actions,
      walletSummary,
      currenciesRates,
      currenciesGraphs,
      user,
      branchTransfer,
      depositCompliance,
      rejectionReasons,
      shouldAnimate,
    } = this.props;
    const style = WalletLandingStyle();

    if (!walletSummary || !user) {
      return <LoadingScreen />;
    }

    return (
      <RegularLayout
        pullToRefresh={() => actions.getWalletSummary()}
        fabType={currenciesRates ? "main" : "hide"}
      >
        <BannerCrossroad />
        <View>
          <MissingInfoCard user={user} navigateTo={actions.navigateTo} />
          <WalletDetailsCard
            walletSummary={walletSummary}
            navigateTo={actions.navigateTo}
            openModal={actions.openModal}
          />
          <View style={style.depositWrapper}>
            <View>
              <CelButton
                onPress={() => actions.navigateTo("GetCoinsLanding")}
                style={{ alignSelf: "flex-start" }}
                margin="10 0 2 0"
                size="small"
                iconRight="IconArrowRight"
              >
                Buy Coins
              </CelButton>
            </View>

            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={() => this.toggleView(WALLET_LANDING_VIEW_TYPES.GRID)}
              >
                <Icon
                  style={{
                    opacity:
                      activeView === WALLET_LANDING_VIEW_TYPES.GRID ? 1 : 0.5,
                  }}
                  fill="primary"
                  name="GridView"
                  width="18"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.listView}
                onPress={() => this.toggleView(WALLET_LANDING_VIEW_TYPES.LIST)}
              >
                <Icon
                  style={{
                    opacity:
                      activeView === WALLET_LANDING_VIEW_TYPES.LIST ? 1 : 0.5,
                  }}
                  fill="primary"
                  name="ListView"
                  width="18"
                />
              </TouchableOpacity>
            </View>
          </View>
          <CoinCards
            shouldAnimate={shouldAnimate}
            activeView={activeView}
            navigateTo={actions.navigateTo}
            walletSummary={walletSummary}
            currenciesGraphs={currenciesGraphs}
            currenciesRates={currenciesRates}
            depositCompliance={depositCompliance}
          />
          <ExpandableItem heading={"COMING SOON"} margin={"10 0 10 0"}>
            {this.renderComingSoon()}
          </ExpandableItem>
        </View>
        <CelPayReceivedModal transfer={branchTransfer} />
        <ReferralSendModal />
        <RejectionReasonsModal rejectionReasons={rejectionReasons} />
        <HodlModeModal />
        <LoanAlertsModalWrapper />
      </RegularLayout>
    );
  }
}

export default withNavigationFocus(WalletLanding);
