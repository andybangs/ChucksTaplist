// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TaplistHeaderColumn from './TaplistHeaderColumn';
import { appBarHeight, colors } from '../constants';

const TaplistHeader = ({
  desc,
  sortColumn,
  onColumnPress
}: {
  desc: boolean,
  sortColumn: string,
  onColumnPress: Function
}) => (
  <View style={styles.container}>
    <TaplistHeaderColumn
      title="#"
      desc={desc}
      isSelected={sortColumn === 'tap'}
      onPress={() => onColumnPress('tap')}
    />
    <TaplistHeaderColumn
      title="Brewery"
      desc={desc}
      isSelected={sortColumn === 'brewery'}
      onPress={() => onColumnPress('brewery')}
      flex={2}
    />
    <TaplistHeaderColumn
      title="Name"
      desc={desc}
      isSelected={sortColumn === 'name'}
      onPress={() => onColumnPress('name')}
      flex={2}
    />
    <TaplistHeaderColumn
      title="$"
      desc={desc}
      isSelected={sortColumn === 'price'}
      onPress={() => onColumnPress('price')}
    />
    <TaplistHeaderColumn
      title="Loc"
      desc={desc}
      isSelected={sortColumn === 'loc'}
      onPress={() => onColumnPress('loc')}
    />
    <TaplistHeaderColumn
      title="%"
      desc={desc}
      isSelected={sortColumn === 'abv'}
      onPress={() => onColumnPress('abv')}
    />
  </View>
);

TaplistHeader.propTypes = {
  desc: PropTypes.bool,
  sortColumn: PropTypes.string.isRequired,
  onColumnPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: appBarHeight,
    backgroundColor: colors.lightgray,
    zIndex: 999,
    shadowRadius: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5
  }
});

export default TaplistHeader;
