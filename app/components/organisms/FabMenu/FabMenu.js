import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BlurView } from "@react-native-community/blur";
import * as appActions from "../../../redux/actions";

import FabMenuStyle from "./FabMenu.styles";
import Fab from "../../molecules/Fab/Fab";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import { THEMES } from "../../../constants/UI";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC, isKYCRejectedForever } from "../../../utils/user-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    fabMenuOpen: state.ui.fabMenuOpen,
    theme: state.user.appSettings.theme,
    appInitialized: state.app.appInitialized,
    fabType: state.ui.fabType,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    depositCompliance: state.compliance.deposit,
    loanCompliance: state.compliance.loan,
    withdrawCompliance: state.compliance.withdraw,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class FabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };

    this.springValue = new Animated.Value(1);
    this.pulseValue = new Animated.Value(1);
    this.opacityValue = new Animated.Value(1);
  }

  componentDidMount = () => {
    const { fabType } = this.props;
    this.setState({
      menuItems: this.getMenuItems(fabType),
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.appInitialized &&
        nextProps.appInitialized !== this.props.appInitialized &&
        nextProps.user.has_pin) ||
      (nextProps.appInitialized &&
        nextProps.user.has_pin &&
        nextProps.user.has_pin !== this.props.user.has_pin)
    ) {
      this.animateInitialization();
    }
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.fabMenuOpen) this.animateOpening();
    if (prevProps.fabMenuOpen) this.animateClosing();
    if (
      (prevProps.fabType !== this.props.fabType &&
        this.props.fabType !== "hide") ||
      prevProps.kycStatus !== this.props.kycStatus
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        menuItems: this.getMenuItems(this.props.fabType),
      });
    }
  };

  getMenuItems(menu) {
    const {
      depositCompliance,
      celpayCompliance,
      loanCompliance,
      withdrawCompliance,
      user,
      kycStatus,
    } = this.props;
    const main = [
      [{ iconName: "Wallet", label: "Wallet", screen: "WalletLanding" }],
      [],
      [{ iconName: "Community", label: "Community", screen: "Community" }],
    ];
    if (depositCompliance.allowed)
      main[0].push({
        iconName: "Deposit",
        label: "Deposit",
        screen: "Deposit",
      });
    if (kycStatus && hasPassedKYC() && withdrawCompliance.allowed)
      main[0].push({
        iconName: "Withdraw",
        label: "Withdraw",
        screen: "WithdrawEnterAmount",
      });
    if (celpayCompliance.allowed)
      main[1].push({
        iconName: "CelPay",
        label: "CelPay",
        screen: "CelPayLanding",
      });
    if (loanCompliance.allowed)
      main[1].push({
        iconName: "Borrow",
        label: "Borrow",
        screen: "BorrowLanding",
      });
    if (user)
      main[1].push({
        iconName: "Profile",
        label: "Profile",
        screen: "Profile",
      });
    // TODO change borrow landing to new screen
    if (kycStatus && hasPassedKYC())
      main[2].splice(1, 0, {
        iconName: "MyCel",
        label: "My CEL",
        screen: "MyCel",
      });

    return {
      main,
      support: [],
    }[menu];
  }

  getTintColor = () => {
    const { theme } = this.props;

    switch (theme) {
      case THEMES.DARK:
      case THEMES.CELSIUS:
        return {
          color: "dark",
          blur: 15,
        };
      case THEMES.LIGHT:
      default:
        return {
          color: "light",
          blur: 12,
        };
    }
  };

  springAnimation = (
    value = undefined,
    friction = undefined,
    tension = undefined,
    velocity = undefined
  ) => {
    Animated.spring(this.springValue, {
      toValue: value || 1.1,
      friction: friction || 0.5,
      tension: tension || 0,
      velocity: velocity || 3,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished)
        Animated.spring(this.springValue, {
          toValue: 1,
          friction: 1.5,
          tension: 3,
          useNativeDriver: true,
        }).start();
    });
  };

  pulseAnimation = (pulse, opacity) => {
    this.pulseValue.setValue(pulse);
    this.opacityValue.setValue(opacity);
    Animated.parallel([
      Animated.timing(this.pulseValue, {
        toValue: 1.7,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.opacityValue, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
    ]);
  };

  animateInitialization = () => {
    setTimeout(() => {
      this.springAnimation(1.3);
      this.pulseAnimation(1.8, 0.8);
    }, 8000);
    setTimeout(() => {
      this.springAnimation();
      this.pulseAnimation(1.5, 0.6);
    }, 10500);
  };

  animateOpening = () => {
    this.springAnimation(1.15, 1, 1, 5);
  };

  animateClosing = () => {
    setTimeout(() => {
      this.springAnimation();
      this.pulseAnimation(1.3, 0.6);
    }, 50);
  };

  fabAction = () => {
    const { fabType } = this.props;
    Keyboard.dismiss();
    switch (fabType) {
      case "main":
        this.toggleMenu();
        break;

      default:
        break;
    }
  };

  toggleMenu = () => {
    const { fabMenuOpen, actions } = this.props;
    if (fabMenuOpen) {
      actions.closeFabMenu();
    } else {
      actions.openFabMenu();
    }
  };

  iconSize = label => {
    switch (label) {
      case "Community":
        return 35;
      case "Wallet":
        return 30;
      case "Withdraw":
        return 30;
      case "Profile":
        return 30;
      case "MyCel":
        return 30;
      default:
        return 33;
    }
  };

  renderMenuItem = item => {
    const { theme, actions } = this.props;
    return (
      <CircleButton
        key={item.label}
        theme={theme}
        onPress={() => {
          actions.resetToScreen(item.screen);
          actions.closeFabMenu();
        }}
        type="menu"
        text={item.label}
        icon={item.iconName}
        iconSize={this.iconSize(item.iconName)}
      />
    );
  };

  renderMenuRow = menuRow => {
    const style = FabMenuStyle();
    return (
      <View key={menuRow[0].label} style={style.menuItemsContainer}>
        {menuRow.map(this.renderMenuItem)}
      </View>
    );
  };

  renderFabMenu = () => {
    const style = FabMenuStyle();
    const { menuItems } = this.state;
    const { actions, theme } = this.props;
    const tintColor = this.getTintColor();

    if (Platform.OS !== "android") {
      return (
        <>
          {Platform.OS === "ios" && (
            <BlurView
              blurType={tintColor.color}
              blurAmount={tintColor.blur}
              style={[StyleSheet.absoluteFill]}
            />
          )}
          <Card
            styles={style.helpCard}
            size={"half"}
            onPress={() => {
              actions.navigateTo("Support");
              actions.closeFabMenu();
            }}
          >
            <Icon
              name={"QuestionCircle"}
              width={25}
              height={25}
              fill={
                theme === "dark"
                  ? STYLES.COLORS.WHITE_OPACITY5
                  : STYLES.COLORS.DARK_GRAY
              }
            />
            <CelText weight={"300"} type={"H5"}>
              Need help?
            </CelText>
          </Card>
          <View style={style.menuContainer}>
            {menuItems.map(this.renderMenuRow)}
          </View>
        </>
      );
    }
    return (
      <TouchableOpacity
        style={[StyleSheet.absoluteFill, style.background]}
        onPress={() => actions.closeFabMenu()}
      >
        <Card
          styles={style.helpCard}
          size={"half"}
          onPress={() => {
            actions.navigateTo("Support");
            actions.closeFabMenu();
          }}
        >
          <Icon
            name={"QuestionCircle"}
            width={25}
            height={25}
            fill={
              theme === "dark"
                ? STYLES.COLORS.WHITE_OPACITY5
                : STYLES.COLORS.DARK_GRAY
            }
          />
          <CelText weight={"300"} type={"H5"}>
            Need help?
          </CelText>
        </Card>
        <View style={style.menuContainer}>
          {menuItems.map(this.renderMenuRow)}
        </View>
      </TouchableOpacity>
    );
  };

  renderFab = () => {
    const style = FabMenuStyle();
    const { fabType } = this.props;
    return (
      <Fragment>
        <Animated.View
          style={[
            style.fabButton,
            style.opacityCircle,
            {
              transform: [{ scale: this.pulseValue }],
              opacity: this.opacityValue,
            },
          ]}
        />
        <Animated.View
          style={[
            style.fabButton,
            { transform: [{ scale: this.springValue }] },
          ]}
        >
          <Fab onPress={this.fabAction} type={fabType} />
        </Animated.View>
      </Fragment>
    );
  };

  render() {
    const style = FabMenuStyle();
    const { fabMenuOpen, fabType } = this.props;

    if (isKYCRejectedForever()) return null;

    // if (!appInitialized) return null; // Too many bugs with this one line of code :D
    if (fabType === "hide") return null;

    const FabMenuCmp = this.renderFabMenu;
    const FabButton = this.renderFab;

    return (
      <Fragment>
        {fabMenuOpen ? <FabMenuCmp style={style.menu} /> : null}
        <FabButton />
      </Fragment>
    );
  }
}

export default FabMenu;
