import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

import VerticalSliderStyle from "./VerticalSlider.styles";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class VerticalSlider extends Component {
  static propTypes = {
    items: PropTypes.instanceOf(Array),
    field: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    updateFormField: PropTypes.func,
    marginTop: PropTypes.number,
  };
  static defaultProps = {
    marginTop: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      slidingStarted: false,
      sliderValue: props.value,
    };
  }

  handleChangeSlideValue = value => {
    const { slidingStarted } = this.state;
    const { onChange, field, updateFormField } = this.props;

    if (onChange) {
      onChange(field, value);
    } else {
      this.setState({ sliderValue: value }, () => {
        if (!slidingStarted) {
          updateFormField(field, value);
        }
      });
    }
  };
  render() {
    const { items, marginTop } = this.props;
    const { sliderValue } = this.state;
    const style = VerticalSliderStyle();

    // Vertical slider height
    const height = (items.length - 1) * 61;
    const values = items.map(i => i.value);
    return (
      <View style={style.container}>
        <View
          style={{
            height,
            width: 40,
            paddingVertical: 10,
            marginRight: 15,
            marginTop,
          }}
        >
          <View style={{ transform: [{ rotate: "90deg" }] }}>
            <Slider
              minimumTrackTintColor={getColor(COLOR_KEYS.LINK)}
              maximumTrackTintColor={getColor(COLOR_KEYS.PARAGRAPH)}
              thumbTintColor={getColor(COLOR_KEYS.LINK)}
              style={{ width: height, height: 40 }}
              orientation="vertical"
              minimumValue={0}
              maximumValue={items.length - 1}
              step={1}
              value={values.indexOf(sliderValue)}
              onSlidingStart={() => this.setState({ slidingStarted: true })}
              onValueChange={step => {
                this.handleChangeSlideValue(values[step]);
              }}
              onSlidingComplete={step => {
                this.setState({ slidingStarted: false }, () => {
                  this.handleChangeSlideValue(values[step]);
                });
              }}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={`value-${index}`}
              style={{ height: 55, justifyContent: "center" }} // Distance between elements
              onPress={() => this.handleChangeSlideValue(item.value)}
            >
              {item.label}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default VerticalSlider;
