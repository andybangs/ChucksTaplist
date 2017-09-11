export type CTAppState = 'active' | 'background' | 'inactive';

export type CTBevType = 'cider' | 'ipa' | 'nitro' | 'sour' | 'stout';

export type CTCompareFunction = (CTMap, CTMap) => -1 | 0 | 1;

export type CTFlatList = { scrollToOffset: Function };

export type CTItem = {
  class: string,
  tap: string,
  brewery: string,
  beer: string,
  pint: string,
  growler: string,
  origin: string,
  abv: string
};

export type CTMap = {
  [string]: string | number
};

export type CTSortColumn = 'tap' | 'brewery' | 'name' | 'price' | 'loc' | 'abv';

export type CTSyntheticScrollEvent = {
  nativeEvent: {
    contentOffset: {
      x: number,
      y: number
    }
  }
};
