// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants';
import { CTBevType } from '../types';

const TaplistItemColumn = ({
  value,
  bevType = null,
  flex = 1
}: {
  value: string,
  bevType?: CTBevType,
  flex?: number
}) => {
  return (
    <View style={[styles.container, { flex }]}>
      <Text style={[styles.text, styles[bevType || 'default']]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    fontSize: 16
  },
  default: {
    color: colors.black
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
