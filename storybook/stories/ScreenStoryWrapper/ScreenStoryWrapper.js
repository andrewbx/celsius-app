import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "../../../app/redux/store";
import ACTIONS from "../../../app/constants/ACTIONS";
import { THEMES } from "../../../app/constants/UI";
import CelHeading from "../../../app/components/organisms/CelHeading/CelHeading";

const { width, height } = Dimensions.get("window");

class ScreenStoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { state } = props;
    store.dispatch({
      type: ACTIONS.SET_WHOLE_STATE,
      state,
    });
  }

  updateTheme = () => {
    const { state } = this.props;
    const theme = store.getState().user.appSettings.theme;
    let nextTheme;

    switch (theme) {
      case THEMES.LIGHT:
        nextTheme = THEMES.DARK;
        break;
      case THEMES.DARK:
        nextTheme = THEMES.UNICORN;
        break;
      case THEMES.UNICORN:
        nextTheme = THEMES.LIGHT;
        break;
    }

    let nextState;
    if (state) {
      nextState = {
        ...state,
        user: {
          ...state.user,
          appSettings: {
            ...state.user.appSettings,
            theme: nextTheme,
          },
        },
      };
    } else {
      nextState = {
        user: {
          profile: { profile_picture: null },
          appSettings: {
            theme: nextTheme,
          },
        },
      };
    }

    store.dispatch({
      type: ACTIONS.SET_WHOLE_STATE,
      state: nextState,
    });

    this.forceUpdate();
  };

  render() {
    const { screen, screenName, navigationProps, screenTap } = this.props;

    const navigatorProps = {
      initialRouteName: screenName,
      initialRouteParams: navigationProps,
      defaultNavigationOptions: {
        header: props => (
          <TouchableOpacity onPress={() => this.updateTheme()}>
            <CelHeading {...props} />
          </TouchableOpacity>
        ),
      },
    };

    const screens = { [screenName]: screen };

    const AppNavigator = createStackNavigator(screens, navigatorProps);
    const AppNavigation = createAppContainer(AppNavigator);

    if (screenTap) {
      return (
        <Provider store={store}>
          <TouchableOpacity
            style={{ width, height }}
            onPress={() => this.updateTheme()}
          >
            <AppNavigation />
          </TouchableOpacity>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

export default ScreenStoryWrapper;
