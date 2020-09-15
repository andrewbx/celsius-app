import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, Image, Linking, View } from "react-native";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import { THEMES, WALLET_LANDING_VIEW_TYPES } from "../../../constants/UI";
import Icon from "../../atoms/Icon/Icon";
import {
  getColor,
  getTheme,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import animationsUtil from "../../../utils/animations-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import ComingSoonCoinsStyle from "./ComingSoonCoins.styles";

class ComingSoonCoins extends Component {
  static propTypes = {
    activeView: PropTypes.oneOf(Object.values(WALLET_LANDING_VIEW_TYPES)),
    isGrid: PropTypes.bool,
    coin: PropTypes.instanceOf(Object),
    offset: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacityAnim: new Animated.Value(0),
    };
  }

  animate = isGrid => {
    const { shouldAnimate, offset } = this.props;
    if (!shouldAnimate) return { opacity: 1 };
    animationsUtil.animateArrayOfObjects(
      this.state.opacityAnim,
      offset,
      isGrid ? 1200 : 750
    );
    return { opacity: this.state.opacityAnim };
  };

  render() {
    const theme = getTheme();
    const style = ComingSoonCoinsStyle();
    const { activeView, coin, isGrid } = this.props;
    const cardSize =
      activeView === WALLET_LANDING_VIEW_TYPES.GRID ? "half" : "full";
    const textSize =
      activeView === WALLET_LANDING_VIEW_TYPES.GRID ? "H6" : "H3";

    return (
      <Animated.View
        style={[
          this.animate(isGrid),
          {
            width: isGrid
              ? widthPercentageToDP("43%")
              : widthPercentageToDP("90%"),
          },
        ]}
      >
        <Card size={cardSize}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              {theme === THEMES.DARK ? (
                <Icon
                  name={`Icon${coin.short}`}
                  width="40"
                  height="40"
                  fill={getColor(COLOR_KEYS.DOT_INDICATOR_INACTIVE)}
                  style={{ marginRight: 12 }}
                />
              ) : (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 12,
                  }}
                  resizeMode="contain"
                  source={coin.image_url}
                />
              )}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CelText weight="300" type="H6">
                    {coin.short}
                  </CelText>
                  {!isGrid && (
                    <CelText
                      link
                      onPress={() => Linking.openURL(coin.learn_more_link)}
                    >
                      Learn more
                    </CelText>
                  )}
                </View>
                <View style={style.coinName}>
                  <CelText type={textSize} weight="bold">
                    {coin.name}
                  </CelText>
                </View>
              </View>
            </View>
          </View>

          {isGrid && (
            <CelText
              margin="5 0 0 0"
              link
              onPress={() => Linking.openURL(coin.learn_more_link)}
            >
              Learn more
            </CelText>
          )}
        </Card>
      </Animated.View>
    );
  }
}

export default ComingSoonCoins;
