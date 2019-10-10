import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Linking, View } from "react-native";

import KYCandPromotionsTriggerStyle from "./KYCandPromotionsTrigger.styles";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";
import { heightPercentageToDP } from "../../../utils/styles-util";

class KYCandPromotionsTrigger extends Component {

  static propTypes = {
    kycType: PropTypes.string.isRequired,
    actions: PropTypes.func.isRequired
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  // lifecycle methodså
  // event hanlders
  // rendering methods
  getColor = () => {
    const { kycType } = this.props;
    let color;

    switch (kycType) {
      case KYC_STATUSES.pending:
      case KYC_STATUSES.sending:
      case KYC_STATUSES.sent:
        color = STYLES.COLORS.ORANGE;
        break;
      case KYC_STATUSES.permanently_rejected:
      case KYC_STATUSES.rejected:
        color = STYLES.COLORS.RED;
        break;
      default:
        color = STYLES.COLORS.CELSIUS_BLUE;
    }

    return color;
  };

  renderKycInfo = () => {
    const { kycType, actions } = this.props;
    const style = KYCandPromotionsTriggerStyle();

    let title;
    let content;
    let info;

    switch (kycType) {
      case KYC_STATUSES.pending:
      case KYC_STATUSES.sending:
      case KYC_STATUSES.sent:
        title = "Your Profile Verification Is In Progress";
        content = "It typically takes just a few minutes to verify your identity. Please contact support if you do not receive verification within the next 24 hours.";
        info = "STARTED 2 HOURS AGO";
        break;
      case KYC_STATUSES.permanently_rejected:
      case KYC_STATUSES.rejected:
        title = "Identity Verification Failed!";
        content = "Please go through the verification process again or contact our support for help.";
        break;
      default:
        title = "Verify Your Profile";
        content = "Become a Celsius member by verifying your profile. You will be able to earn interest on your deposited coins, take dollar and stable coin loans and send crypto to your friends.";
    }


    return (
      <View style={style.textAlignment}>
        <CelText color={"white"} type={"H5"} weight={"500"} margin={"12 0 0 0"}>{title}</CelText>
        {info && <CelText color={"white"} type={"H7"} weight={"300"} margin={"8 0 0 0"}>{info}</CelText>}
        <CelText color={"white"} type={"H7"} weight={"300"} margin={"8 0 0 0"}>{content}</CelText>
        {![KYC_STATUSES.pending, KYC_STATUSES.sending, KYC_STATUSES.sent].includes(kycType) &&
        <CelButton
          margin={"12 0 0 0"}
          color={"white"}
          size={"small"}
          onPress={() => (actions.navigateTo("KYCProfileDetails"))}
          textColor={this.getColor()}
        >
          Verify Profile
        </CelButton>
        }
        {[KYC_STATUSES.rejected, KYC_STATUSES.permanently_rejected].includes(kycType) &&
        <CelText
          onPress={() => Linking.openURL("mailto:app@celsius.network")}
          basic
          color={"white"}
          margin={"8 0 0 0"}
        >
          What could have gone wrong?
        </CelText>
        }
      </View>

    );
  };

  render() {
    const style = KYCandPromotionsTriggerStyle();

    if (hasPassedKYC()) return null;

    return (
      <View style={{marginBottom: heightPercentageToDP("26%") }}>
        <View style={[style.container, { backgroundColor: this.getColor() }]}>
          <View style={style.mainWrapper}>
            <View style={style.halfCircleRight}>
              <Image
                style={style.image}
                source={require("../../../../assets/images/kyc-icon.png")}
              />
            </View>
            <View>
              {this.renderKycInfo()}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default KYCandPromotionsTrigger;