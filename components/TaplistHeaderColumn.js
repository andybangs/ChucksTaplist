import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors } from '../constants';

const TaplistHeaderItem = ({ flex, title }) => {
  return (
    <TouchableHighlight
      style={[styles.container, { flex }]}
      onPress={() => {}}
      underlayColor={colors.lightgray}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

TaplistHeaderItem.defaultProps = {
  flex: 1
};

TaplistHeaderItem.propTypes = {
  flex: PropTypes.number,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default TaplistHeaderItem;
