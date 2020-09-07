import React, { Component } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../../../redux/actions";
import MyCelLoansTabStyle from "./MyCelLoansTab.styles";
import CelText from "../../atoms/CelText/CelText";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";

@connect(
  state => ({
    loyaltyInfo: state.loyalty.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MyCelInterestTab extends Component {
  render() {
    const { width, loyaltyInfo } = this.props;
    const style = MyCelLoansTabStyle();

    return (
      <View style={style.contentWrapper}>
        <View style={{ width, marginBottom: 10 }}>
          <View style={style.wrapper}>
            <View style={style.circle}>
              <ThemedImage
                style={[style.starIcon, { marginTop: 6 }]}
                lightSource={require("../../../../assets/images/loyaltyIcons/celsiusCircleIcon3x.png")}
                darkSource={require("../../../../assets/images/loyaltyIcons/celsiusCircleIconDark3x.png")}
                unicornSource={require("../../../../assets/images/loyaltyIcons/celsiusCircleIconUnicorn3x.png")}
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <CelText type={"H3"} weight={"600"} align={"center"}>
                Pay Less for Loans
              </CelText>
              <CelText align={"center"} type={"H4"} weight={"300"}>
                Pay your interest with CEL to decrease your monthly payment.
              </CelText>
            </View>
          </View>

          <View style={style.wrapper}>
            <CelText align={"center"} type={"H4"} weight={"300"}>
              Based on your{" "}
              <CelText align={"center"} type={"H4"} weight={"500"}>
                Loyalty Level{" "}
                <CelText align={"center"} type={"H4"} weight={"300"}>
                  your discount is :{" "}
                </CelText>
              </CelText>
            </CelText>
            <CelText
              style={style.title}
              align={"center"}
              type={"H1"}
              weight={"600"}
            >
              {`${loyaltyInfo.tier.loanInterestBonus * 100}%`} less
            </CelText>
          </View>
        </View>
      </View>
    );
  }
}

export default MyCelInterestTab;
