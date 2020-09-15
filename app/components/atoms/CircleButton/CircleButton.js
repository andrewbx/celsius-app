import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, ImageBackground } from "react-native";

import CircleButtonStyle from "./CircleButton.styles";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";

class CircleButton extends Component {
  static propTypes = {
    theme: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object),
    ]),
    onPress: PropTypes.func,
    text: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    iconSize: PropTypes.number,
    disabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    selectable: PropTypes.bool,
    iconColor: PropTypes.string,
    type: PropTypes.oneOf(["menu", "theme", "coin", "fab"]).isRequired,
  };

  static defaultProps = {
    isSelected: false,
    selectable: false,
    disabled: false,
    type: "menu",
  };

  shouldComponentUpdate(nextProps) {
    const { isSelected, theme, icon } = this.props;
    return (
      isSelected !== nextProps.isSelected ||
      theme !== nextProps.theme ||
      icon !== nextProps.icon
    );
  }

  render() {
    const {
      disabled,
      style,
      onPress,
      text,
      icon,
      type,
      isSelected,
      selectable,
      iconSize,
      backgroundImage,
      iconColor,
    } = this.props;

    const styleCmp = CircleButtonStyle();

    let fillColor = styleCmp.iconColor.color;
    if (iconColor) {
      fillColor = iconColor;
    }

    const textStyle = [styleCmp.text, styleCmp[`text${type}`]];

    return (
      <View>
        <TouchableOpacity
          disabled={disabled}
          style={[styleCmp.container, style]}
          onPress={!onPress ? () => {} : onPress}
        >
          <View
            style={{
              opacity: isSelected || !selectable ? 1 : 0.5,
              elevation: 2,
            }}
          >
            {backgroundImage ? (
              <ImageBackground
                source={backgroundImage}
                style={[styleCmp.container, styleCmp.view]}
                imageStyle={{ borderRadius: 30 }}
              >
                <View style={[styleCmp.view, styleCmp[`view${type}`]]}>
                  {icon &&
                    (iconSize ? (
                      <Icon name={icon} fill={fillColor} width={iconSize} />
                    ) : (
                      <Icon name={icon} fill={fillColor} />
                    ))}
                </View>
              </ImageBackground>
            ) : (
              <View style={[styleCmp.view, styleCmp[`view${type}`]]}>
                {icon &&
                  (iconSize ? (
                    <Icon name={icon} fill={fillColor} width={iconSize} />
                  ) : (
                    <Icon name={icon} fill={fillColor} />
                  ))}
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View>
          {text && (
            <CelText align="center" type={"H7"} style={textStyle}>
              {text}
            </CelText>
          )}
        </View>
      </View>
    );
  }
}

export default CircleButton;
