// @flow
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import AnimatedArrow from './AnimatedArrow';
import { colors } from '../constants';

const TaplistHeaderColumn = ({
  title,
  desc,
  isSelected,
  onPress,
  flex = 1
}: {
  title: string,
  desc: boolean,
  isSelected: boolean,
  onPress: Function,
  flex?: number
}) => {
  const selectedContainerStyle = isSelected && styles.selectedContainer;
  const textStyle = isSelected ? styles.selectedText : styles.text;

  return (
    <TouchableHighlight
      style={[styles.container, { flex }, selectedContainerStyle]}
      onPress={onPress}
      underlayColor={colors.teal}
    >
      <View style={styles.titleCont}>
        <Text style={textStyle}>{title} </Text>
        {isSelected && <AnimatedArrow desc={desc} />}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tealTransparent
  },
  selectedContainer: {
    backgroundColor: colors.teal
  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: colors.lightgray
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white
  }
});

export default TaplistHeaderColumn;
