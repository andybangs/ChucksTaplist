import React from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import ActionButton from './components/ActionButton';
import TaplistHeader from './components/TaplistHeader';
import TaplistItemRow from './components/TaplistItemRow';
import { EXAMPLE_TAPLIST, colors } from './constants';

const SCROLL_THRESHOLD = 150;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { scrollY: 0 };
  }

  onScroll = ev => {
    const { y } = ev.nativeEvent.contentOffset;

    if (this.state.scrollY < SCROLL_THRESHOLD || y < SCROLL_THRESHOLD) {
      this.setState({ scrollY: y });
    }
  };

  onPress = () => {
    this.taplist.scrollToOffset({ x: 0, y: 0, animated: true });
  };

  render() {
    const { scrollY } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <FlatList
          data={EXAMPLE_TAPLIST.data}
          ListHeaderComponent={TaplistHeader}
          renderItem={props => <TaplistItemRow {...props} />}
          keyExtractor={item => item.tap}
          onScroll={this.onScroll}
          initialNumToRender={9}
          ref={ref => (this.taplist = ref)}
        />
        {scrollY > SCROLL_THRESHOLD && <ActionButton onPress={this.onPress} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightgray
  }
});
