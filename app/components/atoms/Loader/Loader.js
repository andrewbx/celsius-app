import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";
import { getColor, widthPercentageToDP } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class Loader extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    barColor: PropTypes.string,
    borderColor: PropTypes.string,
    width: PropTypes.number,
    flowProgress: PropTypes.bool,
  };

  static defaultProps = {
    height: 10,
    width: 50,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
    barColor: getColor(COLOR_KEYS.SEPARATORS),
    backgroundColor: getColor(COLOR_KEYS.DOT_INDICATOR_INACTIVE),
    flowProgress: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
    };
  }

  componentWillMount() {
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
      }).start();
    }
  }

  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      width,
      backgroundColor,
      flowProgress,
    } = this.props;

    const progress = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    });

    return (
      <View>
        {flowProgress ? (
          <View
            style={{
              width: widthPercentageToDP(`${width}%`),
              height: 4,
              backgroundColor,
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: progress,
                backgroundColor: barColor,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: widthPercentageToDP(`${width}%`),
              height,
              borderColor,
              borderWidth,
              borderRadius,
              backgroundColor,
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: progress,
                backgroundColor: barColor,
                borderRadius: 4,
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

export default Loader;
