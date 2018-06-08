import React, {Component} from 'react';
import { Linking, Text, View } from "react-native";
import {Content} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import TransactionConfirmationStyle from "./TransactionConfirmation.styles";
import AmountInputStyle from "../AmountInput/AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";

@connect(
  () => ({
  // map state to props
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class TransactionConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader backButton/>
        <CelHeading text="Withdraw ETH" />
        <Content>
          <View style={AmountInputStyle.inputWrapper}>
            <Text
              style={AmountInputStyle.fiatAmount}
            >
              $ 0.00
            </Text>
            <Text style={AmountInputStyle.cryptoAmount}>1.56997ETH</Text>
            <View style={AmountInputStyle.separator}/>
            <View style={AmountInputStyle.newBalance}>
              <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
              <Text style={AmountInputStyle.newBalanceText}> 96.5599 ETH =</Text>
              <Text style={AmountInputStyle.newBalanceText}> $ 60.829,00</Text>
            </View>
          </View>

          <Text style={TransactionConfirmationStyle.explanationText}>
            This is the only address you can make withdrawals to. If you want to change the address, please <Text onPress={()=> Linking.openURL('mailto:hello@celsius.network')} style={TransactionConfirmationStyle.contactText}>contact Celsius support.</Text>
          </Text>

          <View style={TransactionConfirmationStyle.addresViewWrapper}>
            <Text style={TransactionConfirmationStyle.toAddress}>TO ADDRESS</Text>
            <Text style={TransactionConfirmationStyle.address}>0xbb9bc244d798123fde783fcc1c72d3bb8c189413</Text>
          </View>

          <CelButton
            onPress={() => (console.log())}
            margin='50 36 50 36'
          >
            Confirm withdrawal
          </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default TransactionConfirmation;
