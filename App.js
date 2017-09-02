import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Taplist from './components/Taplist';
import { colors } from './constants';

const App = () => (
  <View style={styles.container}>
    <StatusBar hidden />
    <Taplist />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.lightgray
  }
});

export default App;
