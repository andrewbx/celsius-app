import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import IconButtonStyle from "./IconButton.styles";
import Icon from "../../atoms/Icon/Icon";
import CelText from "../../atoms/CelText/CelText";
import { getMargins, getPadding, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hideIconRight: PropTypes.bool,
    onPress: PropTypes.func,
    color: PropTypes.oneOf(["white", "blue"]),
    disabled: PropTypes.bool,
    rightText: PropTypes.string,
    rightTextColor: PropTypes.string,
  };
  static defaultProps = {
    margin: "20 0 20 0",
    padding: "0 18 0 18",
    hideIconRight: false,
    disabled: false,
  };

  getColors() {
    const { color } = this.props;
    const style = IconButtonStyle();

    if (color === "blue") {
      return {
        primary: getColor(COLOR_KEYS.PRIMARY_BUTTON),
        secondary: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
        third: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
      };
    }

    return {
      primary: StyleSheet.flatten(style.container).backgroundColor,
      secondary: StyleSheet.flatten(style.textColor).color,
      third: StyleSheet.flatten(style.iconColor).color,
    };
  }

  renderIconButtonContent = () => {
    const { secondary, third } = this.getColors();
    const {
      children,
      icon,
      hideIconRight,
      right,
      rightText,
      rightTextColor,
    } = this.props;
    const style = IconButtonStyle();
    return (
      <>
        <View style={[style.leftWrapper, { flex: rightText ? 0.7 : 1 }]}>
          {!!icon && <Icon fill={third} name={icon} width="25" />}
          <CelText
            type="H4"
            style={{
              marginLeft: icon ? 15 : 0,
              marginRight: 5,
              flexWrap: "wrap",
            }}
            color={secondary}
          >
            {children}
          </CelText>
        </View>
        {rightText && (
          <View style={style.rightTextWrapper}>
            <CelText color={rightTextColor}>{rightText}</CelText>
          </View>
        )}
        <View style={style.rightWrapper}>
          {!!right && (
            <View>
              {typeof right === "string" ? (
                <CelText
                  type="H4"
                  color={getColor(COLOR_KEYS.TOGGLE_OFF_BACKGROUND)}
                >
                  {right}
                </CelText>
              ) : (
                right
              )}
            </View>
          )}
          {!hideIconRight && (
            <Icon
              name="IconChevronRight"
              height="12"
              width="15"
              fill={third}
              iconOpacity={0.5}
            />
          )}
        </View>
      </>
    );
  };

  render() {
    const { primary } = this.getColors();
    const { margin, padding, onPress, disabled } = this.props;
    const style = IconButtonStyle();
    const containerStyle = [
      style.container,
      { ...getMargins(margin), ...getPadding(padding) },
      { backgroundColor: primary },
    ];
    const IconButtonContent = this.renderIconButtonContent;

    if (onPress) {
      return (
        <TouchableOpacity
          disabled={disabled}
          style={containerStyle}
          onPress={onPress}
        >
          <IconButtonContent />
        </TouchableOpacity>
      );
    }

    return (
      <View style={containerStyle}>
        <IconButtonContent />
      </View>
    );
  }
}

export default IconButton;
