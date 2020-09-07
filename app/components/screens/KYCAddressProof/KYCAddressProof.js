import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import store from "../../../redux/store";

import * as appActions from "../../../redux/actions";
// import KYCAddressProofStyle from "./KYCAddressProof.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import KYCCheckUtilityBill from "../KYCCheckUtilityBill/KYCCheckUtilityBill";
import { navigateTo } from "../../../redux/nav/navActions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    utilityBill: state.user.utilityBill,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCAddressProof extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: { steps: 7, currentStep: 5, flowProgress: false },
    headerSameColor: true,
    customBack: () => {
      store.dispatch(navigateTo("KYCVerifyIdentity"));
    },
    gesturesEnabled: false,
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getUtilityBill();
  }

  takeUtilityPhoto = () => {
    const { actions } = this.props;
    actions.activateCamera({
      cameraField: "utility",
      cameraHeading: "Take a Photo",
      cameraCopy:
        "Take a photo of a utility bill, so that your address is clearly visible.",
      cameraType: "back",
      mask: "utility",
    });

    actions.navigateTo("CameraScreen", {
      onSave: utilityBillPhoto => actions.setUtilityBill(utilityBillPhoto),
    });
  };

  render() {
    const { callsInProgress, utilityBill } = this.props;

    if (apiUtil.areCallsInProgress([API.GET_UTILITY_BILL], callsInProgress)) {
      return <LoadingScreen />;
    }

    if (utilityBill && utilityBill.front) {
      return <KYCCheckUtilityBill />;
    }

    return (
      <RegularLayout>
        <CelText type="H2" weight="bold" margin={"0 0 30 0"} align="center">
          Proof of Address
        </CelText>

        <CelText type="H4" weight="300" margin="10 0 20 0" align="center">
          We need one more little thing. Please take a photo of your recent
          utility bill.
        </CelText>

        <Card
          padding="20 20 20 20"
          styles={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          onPress={this.takeUtilityPhoto}
        >
          <Icon
            height="30"
            fill={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
            name="UtilityBill"
          />
          <CelText
            color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
            margin="0 0 0 15"
          >
            Utility Bill Photo >
          </CelText>
        </Card>
      </RegularLayout>
    );
  }
}

export default KYCAddressProof;
