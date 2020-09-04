import React from "react";
import _ from "lodash";

import SelectCoin from "./SelectCoin";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { SIMPLEX_FIAT_CURRENCIES } from "../../../constants/DATA";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
  },
  compliance: mockComplianceStore.allowedAll,
};

const navigationProps = {
  coinListFormatted: mockCurrenciesStore.rates.map(c => ({
    label: c.name,
    value: c.short,
  })),
  field: "coin"
};

const crypto = () => (
  <ScreenStoryWrapper
    screen={SelectCoin}
    screenName="SelectCoin"
    state={initialState}
    navigationProps={navigationProps}
  />
);

const fiat = () => (
  <ScreenStoryWrapper
    screen={SelectCoin}
    screenName="SelectCoin"
    state={initialState}
    navigationProps={{ coinListFormatted: SIMPLEX_FIAT_CURRENCIES }}
  />
);

const selected = () => {
  const state = _.cloneDeep(initialState);
  state.forms = {
    formData: { coin: "XRP" }
  }
  return (
    <ScreenStoryWrapper
      screen={SelectCoin}
      screenName="SelectCoin"
      state={state}
      navigationProps={navigationProps}
    />
  )
};

export default {
  selected,
  crypto,
  fiat,
};
