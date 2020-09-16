import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ChoosePaymentMethodStyle from "./ChoosePaymentMethod.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PrepayDollarInterestModal from "../../modals/PrepayDollarInterestModal/PrepayDollarInterestModal";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    loanSettings: state.loans.loanSettings,
    loyaltyInfo: state.loyalty.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChoosePaymentMethod extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const reason = navigation.getParam("reason");

    let title = "Setup Payment";
    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      title = "Prepay interest";
    }

    return {
      title,
      right: "profile",
      left: "back",
    };
  };

  componentDidMount() {
    const { actions, navigation } = this.props;
    const id = navigation.getParam("id");
    actions.getLoanSettings(id);
  }

  getActiveCards = () => {
    const { navigation, loanSettings } = this.props;
    const reason = navigation.getParam("reason");

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      return {
        cel: loanSettings.interest_payment_asset === "CEL",
        coin: !["CEL", "USD"].includes(loanSettings.interest_payment_asset),
        usd: loanSettings.interest_payment_asset === "USD",
      };
    }

    return {
      cel: false,
      coin: false,
      usd: false,
    };
  };

  getCardProps = () => {
    const { actions, navigation, loyaltyInfo } = this.props;
    const celDiscount = formatter.percentageDisplay(
      loyaltyInfo.tier.loanInterestBonus
    );
    const id = navigation.getParam("id");
    const reason = navigation.getParam("reason");
    const activeCards = this.getActiveCards();

    const pay =
      reason !== LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT ? `pay` : `prepay`;

    const cardProps = [
      {
        textButton: `${formatter.capitalize(pay)} with CEL`,
        explanation: `Pay up to ${celDiscount} less interest when you choose to ${pay} your monthly payment in CEL.`,
        onPress: () => actions.navigateTo(SCREENS.PAYMENT_CEL, { reason, id }),
        lightImage: require("../../../../assets/images/icons/cel.png"),
        darkImage: require("../../.././../assets/images/icons/cel-dark.png"),
        unicornImage: require("../../.././../assets/images/icons/cel-unicorn.png"),
        label: activeCards.cel ? "Currently active" : null,
      },
      {
        textButton: `${formatter.capitalize(pay)} with crypto`,
        explanation: `Use coins from your wallet to ${pay} your loan interest.`,
        onPress: () =>
          actions.navigateTo(SCREENS.LOAN_PAYMENT_COIN, { reason, id }),
        lightImage: require("../../../../assets/images/icons/crypto.png"),
        darkImage: require("../../.././../assets/images/icons/crypto-dark.png"),
        unicornImage: require("../../.././../assets/images/icons/crypto-unicorn.png"),
        label: activeCards.coin ? "Currently active" : null,
      },
      {
        textButton: `${formatter.capitalize(pay)} with Dollars`,
        explanation: `Get all the information necessary to ${pay} your interest in dollars.`,
        onPress: () => {
          if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
            actions.updateFormField("coin", "USD");
            actions.navigateTo(SCREENS.LOAN_PREPAYMENT_PERIOD, { id, reason });
          } else {
            actions.navigateTo(SCREENS.WIRING_BANK_INFORMATION, { id, reason });
          }
        },
        lightImage: require("../../../../assets/images/icons/dollars.png"),
        darkImage: require("../../../../assets/images/icons/dollars-dark.png"),
        unicornImage: require("../../../../assets/images/icons/dollars-unicorn.png"),
        label: activeCards.usd ? "Currently active" : null,
      },
    ];

    return cardProps;
  };

  render() {
    const { actions, loanSettings } = this.props;
    if (!loanSettings) return <LoadingScreen />;

    const style = ChoosePaymentMethodStyle();

    const cardProps = this.getCardProps();

    return (
      <View style={style.container}>
        <RegularLayout>
          {cardProps.map(i => (
            <MultiInfoCardButton {...i} key={i.cardTitle} />
          ))}
        </RegularLayout>
        <PrepayDollarInterestModal
          onPressConfirm={() =>
            actions.navigateTo(SCREENS.LOAN_PREPAYMENT_PERIOD, {
              type: "dollar",
            })
          }
        />
      </View>
    );
  }
}

export default ChoosePaymentMethod;
