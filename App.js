import React from 'react';
import {
  FlatList,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import ActionButton from './components/ActionButton';
import TaplistHeader from './components/TaplistHeader';
import TaplistItemRow from './components/TaplistItemRow';
import { compareNum, compareStr } from './util';
import { appBarHeight, EXAMPLE_TAPLIST, colors } from './constants';

const SCROLL_THRESHOLD = 150;

const COMPARE_FUNCTIONS = {
  tap: {
    asc: compareNum('tap'),
    desc: compareNum('tap', true)
  },
  brewery: {
    asc: compareStr('brewery'),
    desc: compareStr('brewery', true)
  },
  name: {
    asc: compareStr('beer'),
    desc: compareStr('beer', true)
  },
  price: {
    asc: compareStr('pint'),
    desc: compareStr('pint', true)
  },
  loc: {
    asc: compareStr('origin'),
    desc: compareStr('origin', true)
  },
  abv: {
    asc: compareNum('abv'),
    desc: compareNum('abv', true)
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: EXAMPLE_TAPLIST.data,
      desc: false,
      sortColumn: 'tap',
      scrollY: 0
    };
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext({
      duration: 550,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    });
  }

  onScroll = ev => {
    const { y } = ev.nativeEvent.contentOffset;

    if (this.state.scrollY < SCROLL_THRESHOLD || y < SCROLL_THRESHOLD) {
      this.setState({ scrollY: y });
    }
  };

  scrollToTop = () => {
    this.taplist.scrollToOffset({ x: 0, y: 0, animated: true });
  };

  selectColumn = sortColumn => {
    this.setState({ sortColumn });
  };

  toggleDesc = () => {
    this.setState({ desc: !this.state.desc });
  };

  onHeaderColumnPress = column => {
    if (this.state.sortColumn !== column) {
      this.selectColumn(column);
    } else {
      this.toggleDesc();
    }

    this.scrollToTop();
  };

  render() {
    const { data, desc, sortColumn, scrollY } = this.state;
    const sortedData = data.sort(
      COMPARE_FUNCTIONS[sortColumn][desc ? 'desc' : 'asc']
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <TaplistHeader
          desc={desc}
          sortColumn={sortColumn}
          onColumnPress={this.onHeaderColumnPress}
        />
        <FlatList
          style={styles.list}
          data={sortedData}
          renderItem={props => <TaplistItemRow {...props} />}
          extraData={this.state}
          keyExtractor={item => item.tap}
          onScroll={this.onScroll}
          initialNumToRender={9}
          ref={ref => (this.taplist = ref)}
        />
        {scrollY > SCROLL_THRESHOLD && (
          <ActionButton onPress={this.scrollToTop} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightgray
  },
  list: {
    marginTop: appBarHeight
  }
});
