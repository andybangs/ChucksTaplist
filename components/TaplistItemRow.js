import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import TaplistItemColumn from './TaplistItemColumn';
import { colors } from '../constants';

const TaplistItem = ({ item, separators }) => {
  const bevType = item.class.split(' ')[1];

  return (
    <TouchableHighlight
      onPress={() => {}}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <View style={styles.row}>
        <TaplistItemColumn bevType={bevType} value={item.tap} />
        <TaplistItemColumn bevType={bevType} value={item.brewery} flex={2} />
        <TaplistItemColumn bevType={bevType} value={item.beer} flex={2} />
        <TaplistItemColumn bevType={bevType} value={item.pint} />
        <TaplistItemColumn bevType={bevType} value={item.origin} />
        <TaplistItemColumn bevType={bevType} value={item.abv} />
      </View>
    </TouchableHighlight>
  );
};

TaplistItem.propTypes = {
  item: PropTypes.object.isRequired,
  separators: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  row: {
    minHeight: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 1
  }
});

export default TaplistItem;
