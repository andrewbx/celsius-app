import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CellphoneVerify extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: { steps: 5, currentStep: 3, flowProgress: false },
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  verify = async verificationCode => {
    const { actions } = this.props;
    const response = await actions.verifySMS(verificationCode);
    if (response.success) {
      actions.showMessage("success", "Phone number verified!");
      actions.getProfileInfo();
      actions.navigateTo(SCREENS.PROFILE);
    }
  };

  render() {
    const { actions, formData, user } = this.props;

    return (
      <RegularLayout>
        <CelText margin="0 0 14 0" type="H1" align="center">
          Verify your phone number
        </CelText>
        <CelText margin="0 0 30 0" type="H4" align="center">
          We have sent you an SMS with a code.
        </CelText>
        <CelInput
          type="text"
          field="sixCode"
          placeholder="Enter four digit code"
          value={formData.sixCode}
        />
        <CelButton
          margin={"0 0 30"}
          onPress={() => this.verify(formData.sixCode)}
        >
          Verify
        </CelButton>
        <CelButton
          margin="30 0 40 0"
          onPress={() => {
            actions.sendVerificationSMS(user.cellphone);
          }}
          basic
        >
          Resend code
        </CelButton>
      </RegularLayout>
    );
  }
}

export default CellphoneVerify;
