import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import HodlLandingStyle from "./HodlLanding.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import CelButton from "../../atoms/CelButton/CelButton";
import { getPadding } from "../../../utils/styles-util";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "HODL mode",
    right: "profile",
  });

  render() {
    // const style = HodlLandingStyle();
    const { actions } = this.props;

    const isInHodlMode = false;

    const padding = isInHodlMode ? "0 0 0 0" : "20 20 100 20";

    return (
      <RegularLayout padding={padding}>
        {isInHodlMode ? (
          <View>
            <HeadingProgressBar steps={3} currentStep={1} />
            <View
              style={[
                { flex: 1, width: "100%", height: "100%" },
                { ...getPadding("20 20 100 20") },
              ]}
            >
              <CelText
                align={"left"}
                margin={"10 0 10 0"}
                type={"H2"}
                weight={"bold"}
              >
                What is HODL mode?
              </CelText>
              <CelText type={"H4"} align={"left"}>
                {"HODL mode is a feature that gives you the ability to disable certain actions on your profile. This feature enhances your profile security and is very convenient if you prefer to HODL your cryptocurrencies. \n" +
                  "\n" +
                  "Just keep in mind, we will give you a code to deactivate HODL mode and you will need to remember it.\n" +
                  "\n"}
              </CelText>
              <CelButton
                onPress={() => actions.navigateTo("HODLInfoCheckboxes")}
              >
                Continue
              </CelButton>
            </View>
          </View>
        ) : (
          <View>
            <CelText
              align={"left"}
              margin={"10 0 10 0"}
              type={"H2"}
              weight={"bold"}
            >
              Deactivation of HODL mode
            </CelText>
            <CelText type={"H4"} align={"left"}>
              Text about what will happen if the user deactivates HODL mode.
              Text about what will happen if the user deactivates HODL mode.
              Text about what will happen if the user deactivates HODL mode.
              Text about what will happen if the user deactivates HODL mode.
              Text about what will happen if the user deactivates HODL mode.
            </CelText>
            <CelButton
              onPress={() => actions.navigateTo("HodlDeactivateInfoCheckboxes")}
              margin={"20 0 0 0"}
            >
              Deactivate HODL mode
            </CelButton>
          </View>
        )}
      </RegularLayout>
    );
  }
}

export default HodlLanding;
