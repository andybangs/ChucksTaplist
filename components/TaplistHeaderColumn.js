import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import AnimatedArrow from './AnimatedArrow';
import { colors } from '../constants';

const TaplistHeaderColumn = ({ flex, title, desc, isSelected, onPress }) => {
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

TaplistHeaderColumn.defaultProps = {
  flex: 1
};

TaplistHeaderColumn.propTypes = {
  flex: PropTypes.number,
  title: PropTypes.string.isRequired,
  desc: PropTypes.bool,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func.isRequired
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
