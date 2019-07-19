import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash'

import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import Icon from "../../atoms/Icon/Icon";
import STYLES from '../../../constants/STYLES';
import { isUSCitizen } from "../../../utils/user-util";
import { THEMES } from '../../../constants/UI';
import { getTheme } from "../../../utils/styles-util";


@connect(
  state => ({
    appSettings: state.user.appSettings,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class PerCoinCelInterestCard extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    const { appSettings, actions, currencies } = props

    const coinList = Object.keys(appSettings.interest_in_cel_per_coin)
    const coinNames = {}
    currencies.forEach(c => {
      coinNames[c.short] = c.displayName
    })
    const totalCoins = Object.keys(appSettings.interest_in_cel_per_coin).length
    let countCoinsTrue = 0
    let checked = false

    Object.keys(appSettings.interest_in_cel_per_coin).forEach(key => {
      if (appSettings.interest_in_cel_per_coin[key] === true) countCoinsTrue++
    })

    if (countCoinsTrue > 0 && countCoinsTrue < totalCoins) {
      checked = true
    } else if (countCoinsTrue === totalCoins) {
      checked = false
    }

    this.state = {
      coinList,
      coinNames,
      isLoading: false,
      isExpanded: false,
      checked
    };

    actions.initForm({
      interestInCel: appSettings.interest_in_cel,
      coinsInCel: { ...appSettings.interest_in_cel_per_coin }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { appSettings, actions, formData } = this.props

    if (!_.isEqual(appSettings, nextProps.appSettings)) {
      actions.initForm({
        interestInCel: nextProps.appSettings.interest_in_cel,
        coinsInCel: { ...nextProps.appSettings.interest_in_cel_per_coin }
      })
    }
    if (!_.isEqual(formData.coinsInCel, nextProps.formData.coinsInCel)) {
      this.changeMainCheck(nextProps.formData.coinsInCel)
    }
  }

  changeMainCheck = (coinsInCel) => {
    const { formData, actions, appSettings } = this.props
    let countCoinsTrue = 0
    const totalCoins = Object.keys(appSettings.interest_in_cel_per_coin).length

    Object.keys(coinsInCel).forEach(key => {
      if (coinsInCel[key] === true) return countCoinsTrue++
    })

    if (countCoinsTrue > 0 && countCoinsTrue < totalCoins && !this.state.checked) {
      this.setState({ checked: true })
    } else if (this.state.checked && countCoinsTrue === totalCoins) {
      this.setState({ checked: false })
    }

    if (countCoinsTrue && !formData.interestInCel) {
      actions.updateFormField('interestInCel', true)
    } else if (!countCoinsTrue && formData.interestInCel) {
      actions.updateFormField('interestInCel', false)
    }
  }

  saveSelection = async () => {
    const { actions, formData } = this.props;
    const { coinList } = this.state

    const interestInCelPerCoin = {}
    let areAllCoinsOff = true
    coinList.forEach(c => {
      areAllCoinsOff = areAllCoinsOff && !formData.coinsInCel[c]
      interestInCelPerCoin[c] = formData.coinsInCel[c]
    })

    this.setState({ isLoading: true })

    await actions.setUserAppSettings({
      interest_in_cel: !areAllCoinsOff,
      interest_in_cel_per_coin: interestInCelPerCoin,
    })

    this.setState({ isLoading: false })
  }

  toggleAll = (field, value) => {
    const { actions } = this.props
    const { coinList } = this.state

    const interestInCel = value
    const interestInCelPerCoin = {}
    coinList.forEach(c => {
      interestInCelPerCoin[c] = interestInCel
    })
    actions.initForm({
      interestInCel,
      coinsInCel: { ...interestInCelPerCoin }
    })
  }

  renderImage() {
    let icon

    if (this.state.checked) {
      icon = <Icon name='MinusBorder' width='23' height='23' fill={STYLES.COLORS.CELSIUS_BLUE} style={{ borderWidth: 1, borderRadius: 5, borderColor: STYLES.COLORS.GRAY }} />
    }
    else {
      icon = <Icon name='CheckedBorder' width='23' height='23' fill={STYLES.COLORS.GREEN} />
    }
    return icon
  }

  render() {
    if (isUSCitizen()) return null
    
    const theme = getTheme();
    const { formData, actions } = this.props
    const { coinList, isExpanded, coinNames, isLoading } = this.state
    const fillColor = theme === THEMES.DARK ? STYLES.COLORS.DARK_HEADER : STYLES.COLORS.WHITE

    return (
      <Card>
        <CelCheckbox
          field="interestInCel"
          onChange={this.toggleAll}
          value={formData.interestInCel}
          rightText="Earn interest in CEL"
          rightTextStyle={{ color: 'red' }}
          checkedImage={this.renderImage()}
          unChecked={<Icon name='Unchecked' width={23} height={23} fill={fillColor} style={{ borderWidth: 1, borderRadius: 6, borderColor: STYLES.COLORS.GRAY }} />}
        />

        <Separator margin="0 0 15 0" />

        <TouchableOpacity
          onPress={() => this.setState({ isExpanded: !isExpanded })}
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}
        >
          <CelText color={STYLES.COLORS.MEDIUM_GRAY}>Choose each coin separately</CelText>
          <Icon
            name={isExpanded ? "UpArrow" : "DownArrow"}
            height='9'
            fill={STYLES.COLORS.MEDIUM_GRAY}
            width='15'
          />

        </TouchableOpacity>
        {
          isExpanded && (
            <View style={{ marginTop: 25 }}>
              {coinList.map(c => (
                <CelCheckbox
                  key={c}
                  field={c}
                  onChange={(field, value) => {
                    actions.updateFormFields({
                      ...formData,
                      coinsInCel: {
                        ...formData.coinsInCel,
                        ...{ [field]: value }
                      }
                    })
                  }}

                  value={!!formData.coinsInCel[c]}
                  rightText={`${coinNames[c]} - ${c}`}
                  checkedImage={<Icon name='CheckedBorder' width='23' height='23' fill={STYLES.COLORS.GREEN} />}
                  unChecked={<Icon name='Unchecked' width='23' height='23' fill={fillColor} style={{ borderWidth: 1, borderRadius: 6, borderColor: STYLES.COLORS.GRAY }} />}

                />
              ))}
              <CelButton
                onPress={this.saveSelection}
                basic
                margin="5 0 0 0"
                loading={isLoading}
              >
                Save
            </CelButton>
            </View>
          )
        }
      </Card >
    );
  }
}

export default PerCoinCelInterestCard