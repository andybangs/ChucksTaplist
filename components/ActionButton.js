import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { colors } from '../constants';

export default class ActionButton extends React.Component {
  componentWillMount() {
    this.animatedOpacity = new Animated.Value(0);
    this.animatedScale = new Animated.Value(1);
  }

  componentDidMount() {
    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease
    }).start();
  }

  onPressIn = () => {
    Animated.spring(this.animatedScale, { toValue: 0.9 }).start();
  };

  onPressOut = () => {
    Animated.spring(this.animatedScale, { toValue: 1 }).start();
    this.props.onPress();
  };

  render() {
    const animatedStyle = {
      opacity: this.animatedOpacity,
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

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 56,
    height: 56,
    bottom: 40,
    right: 30,
    borderRadius: 28,
    backgroundColor: colors.teal,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  text: {
    fontSize: 24,
    color: colors.white
  }
});
