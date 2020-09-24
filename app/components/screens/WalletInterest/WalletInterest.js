import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import WalletInterestStyle from "./WalletInterest.styles";
import { EMPTY_STATES } from "../../../constants/UI";
import GraphContainer from "../../graphs/GraphContainer/GraphContainer";
import LoadingScreen from "../../screens/LoadingScreen/LoadingScreen";
import Separator from "../../atoms/Separator/Separator";
import InterestCalculatorScreen from "../InterestCalculatorScreen/InterestCalculatorScreen";
import { hasPassedKYC, isUSCitizen } from "../../../utils/user-util/user-util";
import PerCoinCelInterestCard from "../../molecules/PerCoinCelInterestCard/PerCoinCelInterestCard";
import Counter from "../../molecules/Counter/Counter";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    transactions: state.transactions.transactionList,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencyGraphs: state.currencies.graphs,
    user: state.user.profile,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    appSettings: state.user.appSettings,
    interestCompliance: state.compliance.interest,
    email: state.user.profile.email,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletInterest extends Component {
  static navigationOptions = {
    title: "Rewards earned",
    right: "profile",
  };

  constructor(props) {
    super(props);

    this.state = {
      header: {
        title: "Rewards earned",
        left: "back",
        right: "profile",
      },
    };
  }

  async componentDidMount() {
    const { actions } = this.props;
    actions.changeInterestHeaderContent();
    await actions.getLoyaltyInfo();
    await actions.getUserAppSettings();
  }

  render() {
    const {
      walletSummary,
      user,
      appSettings,
      loyaltyInfo,
      actions,
      interestCompliance,
    } = this.props;
    const style = WalletInterestStyle();

    if (!appSettings || !loyaltyInfo) return <LoadingScreen />;
    if (!interestCompliance.allowed) {
      return <InterestCalculatorScreen purpose={EMPTY_STATES.COMPLIANCE} />;
    }
    if (isUSCitizen() && !user.ssn) {
      return (
        <InterestCalculatorScreen purpose={EMPTY_STATES.NO_SSN_INTEREST} />
      );
    }
    if (walletSummary.total_interest_earned <= 0) {
      return <InterestCalculatorScreen purpose={EMPTY_STATES.ZERO_INTEREST} />;
    }
    if (!hasPassedKYC()) {
      return (
        <InterestCalculatorScreen
          purpose={EMPTY_STATES.NON_VERIFIED_INTEREST}
        />
      );
    }

    return (
      <RegularLayout padding="20 0 100 0">
        <View style={style.container}>
          <Card>
            <>
              <CelText type="H6" weight="300">
                Total Earnings
              </CelText>
              <View style={style.amountWrapper}>
                <Counter
                  hideFromRecording
                  weight="600"
                  type="H2"
                  number={walletSummary.total_interest_earned}
                  speed={5}
                  usd
                />
                <TouchableOpacity
                  onPress={() => actions.navigateTo(SCREENS.INTEREST_RATES)}
                >
                  <CelText link>Weekly Reward Rates</CelText>
                </TouchableOpacity>
              </View>
              <Separator margin="10 0 0 0" />
              <TouchableOpacity
                onPress={() => {
                  actions.navigateTo(SCREENS.INTEREST_CALCULATOR_SCREEN);
                }}
                style={{ marginTop: 10 }}
              >
                <ThemedImage
                  style={{
                    alignSelf: "center",
                    width: 25,
                    height: 25,
                    marginBottom: 5,
                    marginTop: 6,
                  }}
                  lightSource={require("../../../../assets/images/calculator.png")}
                  darkSource={require("../../../../assets/images/calculator.png")}
                  unicornSource={require("../../../../assets/images/calculator-unicorn.png")}
                />
                <CelText align="center" link>
                  Calculator
                </CelText>
              </TouchableOpacity>
            </>
          </Card>
        </View>

        <GraphContainer
          showCursor
          showPeriods
          interest
          type={"total-interest"}
        />

        <View style={style.container}>
          <PerCoinCelInterestCard />
          <TransactionsHistory
            hasFilter={false}
            additionalFilter={{ type: ["interest"], limit: 5 }}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default WalletInterest;
