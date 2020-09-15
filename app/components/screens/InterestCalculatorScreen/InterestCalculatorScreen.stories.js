import React from "react";

import InterestCalculatorScreen from "./InterestCalculatorScreen";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  wallet: {
    summary: mockWalletStore.summary.postman13,
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  compliance: mockComplianceStore.allowedAll,
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
  forms: {
    formData: {
      coin: "BTC",
    },
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screen={InterestCalculatorScreen}
      screenName="InterestCalculatorScreen"
      state={initialState}
    />
  );
};

export default {
  regular,
};
