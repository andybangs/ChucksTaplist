import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaplistHeaderColumn from './TaplistHeaderColumn';

const TaplistHeader = () => (
  <View style={styles.container}>
    <TaplistHeaderColumn title="#" />
    <TaplistHeaderColumn title="Brewery" flex={2} />
    <TaplistHeaderColumn title="Name" flex={2} />
    <TaplistHeaderColumn title="Price" />
    <TaplistHeaderColumn title="Origin" />
    <TaplistHeaderColumn title="ABV" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default TaplistHeader;
