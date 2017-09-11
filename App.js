import React from 'react';
import {
  AppState,
  AsyncStorage,
  FlatList,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import ActionButton from './components/ActionButton';
import TaplistHeader from './components/TaplistHeader';
import TaplistItemRow from './components/TaplistItemRow';
import { compareAsc, compareDesc, parseNumber, parsePrice } from './util';
import { appBarHeight, colors } from './constants';

const COMPARE_FUNCTIONS = {
  tap: {
    asc: compareAsc('tap', parseNumber),
    desc: compareDesc('tap', parseNumber)
  },
  brewery: {
    asc: compareAsc('brewery'),
    desc: compareDesc('brewery')
  },
  name: {
    asc: compareAsc('beer'),
    desc: compareDesc('beer')
  },
  price: {
    asc: compareAsc('pint', parsePrice),
    desc: compareDesc('pint', parsePrice)
  },
  loc: {
    asc: compareAsc('origin'),
    desc: compareDesc('origin')
  },
  abv: {
    asc: compareAsc('abv', parseNumber),
    desc: compareDesc('abv', parseNumber)
  }
};

const LAST_UPDATED = '@ChucksTaplist:lastUpdated';
const REFRESH_INTERVAL = 3600000; // one hour
const SCROLL_THRESHOLD = 150;
const URL =
  'https://qz2twkw52m.execute-api.us-west-2.amazonaws.com/prod/taplist';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: 'inactive',
      data: [],
      desc: false,
      refreshing: false,
      scrollY: 0,
      sortColumn: 'tap'
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext({
      duration: 550,
      update: { type: LayoutAnimation.Types.easeInEaseOut }
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onScroll = ev => {
    const { y } = ev.nativeEvent.contentOffset;

    if (this.state.scrollY < SCROLL_THRESHOLD || y < SCROLL_THRESHOLD) {
      this.setState({ scrollY: y });
    }
  };

  fetchData = async () => {
    this.setState({ refreshing: true });

    try {
      const response = await fetch(URL);
      const json = await response.json();

      this.setState({ data: json['body-json'].data, refreshing: false });

      try {
        await AsyncStorage.setItem(LAST_UPDATED, JSON.stringify(Date.now()));
      } catch (err) {
        // Error saving data
      }
    } catch (err) {
      // Error fetching data
      this.setState({ refreshing: false });
    }
  };

  handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      try {
        const lastUpdated = await AsyncStorage.getItem(LAST_UPDATED);

        if (lastUpdated !== null) {
          const timeLapsed = Date.now() - parseInt(lastUpdated, 10);

          if (timeLapsed > REFRESH_INTERVAL) {
            this.fetchData();
          }
        }
      } catch (err) {
        // Error retrieving data
      }
    }

    this.setState({ appState: nextAppState });
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
    const { data, desc, refreshing, scrollY, sortColumn } = this.state;
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
          onRefresh={this.fetchData}
          refreshing={refreshing}
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
