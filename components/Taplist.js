import React from 'react';
import { FlatList } from 'react-native';
import TaplistHeader from './TaplistHeader';
import TaplistItemRow from './TaplistItemRow';
import { EXAMPLE_TAPLIST } from '../constants';

const Taplist = () => (
  <FlatList
    data={EXAMPLE_TAPLIST.data}
    ListHeaderComponent={TaplistHeader}
    renderItem={TaplistItemRow}
    keyExtractor={item => item.tap}
  />
);

export default Taplist;
