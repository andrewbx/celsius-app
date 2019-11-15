import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { MODALS, THEMES } from "../../../constants/UI";

import WithdrawWarningModalStyle from "./WithdrawWarningModal.styles";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import Separator from "../../atoms/Separator/Separator";
import CelModal from "../CelModal/CelModal";

class WithdrawWarningModal extends Component {
  static propTypes = {
    coin: PropTypes.string,
    navigateNext: PropTypes.func,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  render() {
    const { isChecked } = this.state;
    const { coin, navigateNext } = this.props;
    const style = WithdrawWarningModalStyle();

    const tagUpperCase = coin === "XRP" ? "DESTINATION TAG" : "MEMO ID";
    const tag = coin === "XRP" ? "destination tag" : "Memo ID";

    return (
      <CelModal
        name={MODALS.WITHDRAW_WARNING_MODAL}
        shouldRenderCloseButton={false}
      >
        <View style={style.wrapper}>
          <CelText type="H2" weight="bold" align="center" margin={"0 30 15 30"}>
            You Didn't Enter {tagUpperCase}
          </CelText>
          <CelText type="H4" weight="300" align="center" margin={"0 0 15 0"}>
            To prevent
            <CelText type="H4" weight="600">
              {" permanent loss "}
            </CelText>
            of your funds, please check if your address has a{" "}
            <CelText type="H4" weight="400" color={STYLES.COLORS.CELSIUS_BLUE}>
              {tag}
            </CelText>
          </CelText>
          <Separator />
          <View style={style.checkbox}>
            <CelCheckbox
              field="hasNotTag"
              margin={"0 20 0 0"}
              uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
              checkedCheckBoxColor={STYLES.COLORS.GREEN}
              value={this.state.isChecked}
              onChange={(field, value) => this.setState({ isChecked: value })}
              rightText={`My address doesn't have a\n${tag}`}
              theme={THEMES.LIGHT}
            />
          </View>
        </View>
        <View>
          <CelModalButton
            buttonStyle={isChecked === false ? "disabled" : "basic"}
            onPress={navigateNext}
          >
            Continue
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default WithdrawWarningModal;
