// @flow
import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import TaplistItemColumn from './TaplistItemColumn';
import { colors } from '../constants';
import { CTItem } from '../types';

type Props = {
  item: CTItem,
  separators: {
    highlight: Function,
    unhighlight: Function
  }
};

export default class TaplistItem extends React.PureComponent<*, Props, *> {
  render() {
    const { item, separators } = this.props;
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
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'space-around',
    paddingTop: 2.5,
    paddingBottom: 2.5,
    backgroundColor: colors.white,
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 1
  }
});
