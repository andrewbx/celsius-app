import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";
import Card from '../../atoms/Card/Card';
import CelText from '../../atoms/CelText/CelText';
import Separator from '../../atoms/Separator/Separator';
import WalletDetailsCardStyle from "./WalletDetailsCard.styles";
import formatter from '../../../utils/formatter';
import STYLES from '../../../constants/STYLES';

class WalletDetailsCard extends PureComponent {

  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired
  };

  navigateToBalanceHistory = () => this.props.navigateTo('BalanceHistory');

  navigateToWalletInterest = () => this.props.navigateTo('BalanceHistory')

  render() {
    const { walletSummary } = this.props;
    const walletDetailsCardStyle = WalletDetailsCardStyle();

    return (
      <Card>
        <View style={walletDetailsCardStyle.container}>
          <TouchableOpacity style={walletDetailsCardStyle.balance} onPress={this.navigateToBalanceHistory}>
            <CelText type="H6" color="rgba(61,72,83,0.7)">Total Wallet balance</CelText>
            <CelText type="H3" bold>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
            <CelText color={STYLES.COLORS.RED}>{walletSummary.wallet_diff_24h}</CelText>
          </TouchableOpacity>

          <Separator vertical />

          <TouchableOpacity style={walletDetailsCardStyle.interest} onPress={this.navigateToWalletInterest}>
            <CelText type="H6" color="rgba(61,72,83,0.7)">Total Interest earned</CelText>
            <CelText type="H3" bold>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
            <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

export default testUtil.hookComponent(WalletDetailsCard);
