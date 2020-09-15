import React from "react";
import _ from "lodash";

import BorrowCalculatorScreen from "./BorrowCalculatorScreen";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import walletUtil from "../../../utils/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  compliance: mockComplianceStore.allowedAll,
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  loans: {
    allLoans: mockLoansStore.allLoans.enimalnowlt3,
    ltvs: mockLoansStore.ltvs,
    activeLoan: mockLoansStore.allLoans.enimalnowlt3[0],
  },
  forms: {
    formData: {},
  },
  nav: {
    activeScreen: "BorrowLanding",
  },
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
};

const regular = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    coin: "BTC",
    termOfLoan: 6,
    amount: 1000,
    ltv: state.loans.ltvs[0],
  };
  return (
    <ScreenStoryWrapper
      screenName="BorrowCalculatorScreen"
      screen={BorrowCalculatorScreen}
      state={state}
    />
  );
};

export default {
  regular,
};
