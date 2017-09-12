// @flow
import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { colors } from '../constants';

export default class ActionButton extends React.Component {
  animatedOpacity: any;
  animatedScale: any;
  animatedShadowRadius: any;

  componentWillMount() {
    this.animatedOpacity = new Animated.Value(0);
    this.animatedScale = new Animated.Value(1);
    this.animatedShadowRadius = new Animated.Value(3);
  }

  componentDidMount() {
    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease
    }).start();
  }

  onPressIn = () => {
    Animated.parallel([
      Animated.spring(this.animatedScale, { toValue: 0.9 }),
      Animated.spring(this.animatedShadowRadius, { toValue: 1 })
    ]).start();
  };

  onPressOut = () => {
    Animated.parallel([
      Animated.spring(this.animatedScale, { toValue: 1 }),
      Animated.spring(this.animatedShadowRadius, { toValue: 3 })
    ]).start();

    this.props.onPress();
  };

  render() {
    const animatedStyle = {
      opacity: this.animatedOpacity,
      shadowRadius: this.animatedShadowRadius,
      transform: [{ scale: this.animatedScale }]
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={styles.text}>▲</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 54,
    height: 54,
    bottom: 40,
    right: 30,
    borderRadius: 27,
    backgroundColor: colors.teal,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5
  },
  text: {
    fontSize: 24,
    color: colors.white
  }
});
