import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, StyleSheet } from 'react-native';
import { colors } from '../constants';

export default class AnimatedArrow extends React.Component {
  componentWillMount() {
    this.animatedRotation = new Animated.Value(this.props.desc ? 1 : 0);
    this.animatedFontSize = new Animated.Value(1);
  }

  componentDidMount() {
    Animated.timing(this.animatedFontSize, {
      toValue: 8,
      duration: 300
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.desc !== this.props.desc) {
      Animated.timing(this.animatedRotation, {
        toValue: this.props.desc ? 0 : 1,
        duration: 300,
        easing: Easing.ease
      }).start();
    }
  }

  render() {
    const interpolateRotaion = this.animatedRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });

    const animatedStyle = {
      fontSize: this.animatedFontSize,
      transform: [{ rotate: interpolateRotaion }]
    };

    return (
      <Animated.Text style={[styles.text, animatedStyle]}>▲</Animated.Text>
    );
  }
}

AnimatedArrow.propTypes = {
  desc: PropTypes.bool
};

const styles = StyleSheet.create({
  text: {
    fontSize: 8,
    color: colors.white
  }
});
