// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants';
import { CTBevType } from '../types';

const TaplistItemColumn = ({
  bevType,
  value,
  flex
}: {
  bevType: CTBevType,
  value: string,
  flex?: number
}) => {
  return (
    <View style={[styles.container, { flex }]}>
      <Text style={[styles.text, styles[bevType]]}>{value}</Text>
    </View>
  );
};

TaplistItemColumn.defaultProps = {
  bevType: null,
  flex: 1
};

TaplistItemColumn.propTypes = {
  bevType: PropTypes.string,
  value: PropTypes.string.isRequired,
  flex: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    fontSize: 16
  },
  cider: {
    color: colors.orange
  },
  ipa: {
    color: colors.green
  },
  nitro: {
    color: colors.blue
  },
  sour: {
    color: colors.purple
  },
  stout: {
    color: colors.brown
  }
});

export default TaplistItemColumn;
