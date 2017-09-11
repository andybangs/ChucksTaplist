import {
  compareAsc,
  compareDesc,
  parseNumber,
  parsePrice,
  toUpperCase
} from './util';

describe('util', () => {
  describe('compare functions', () => {
    const key = 'key';
    const obj1 = { key: 'apple' };
    const obj2 = { key: 'banana' };
    const parseFn = jest.fn(x => x);

    describe('compareAsc', () => {
      it('returns a function', () => {
        expect(compareAsc(key)).toBeInstanceOf(Function);
      });
    });

    describe('compareAsc(key, parseFn)', () => {
      it('calls parse function', () => {
        compareAsc(key, parseFn)(obj1, obj2);

        expect(parseFn).toHaveBeenCalledWith(obj1[key]);
        expect(parseFn).toHaveBeenCalledWith(obj2[key]);
      });

      it('returns -1', () => {
        expect(compareAsc(key, parseFn)(obj1, obj2)).toEqual(-1);
      });

      it('returns 0', () => {
        expect(compareAsc(key, parseFn)(obj1, obj1)).toEqual(0);
      });

      it('returns 1', () => {
        expect(compareAsc(key, parseFn)(obj2, obj1)).toEqual(1);
      });
    });

    describe('compareDesc', () => {
      it('returns a function', () => {
        expect(compareDesc(key)).toBeInstanceOf(Function);
      });
    });

    describe('compareDesc(key, parseFn)', () => {
      it('calls parse function', () => {
        compareAsc(key, parseFn)(obj1, obj2);

        expect(parseFn).toHaveBeenCalledWith(obj1[key]);
        expect(parseFn).toHaveBeenCalledWith(obj2[key]);
      });

      it('returns -1', () => {
        expect(compareDesc(key, parseFn)(obj2, obj1)).toEqual(-1);
      });

      it('returns 0', () => {
        expect(compareDesc(key, parseFn)(obj2, obj2)).toEqual(0);
      });

      it('returns 1', () => {
        expect(compareDesc(key, parseFn)(obj1, obj2)).toEqual(1);
      });
    });
  });

  describe('parse functions', () => {
    describe('parseNumber', () => {
      it('returns parsed int', () => {
        expect(parseNumber('1')).toEqual(1);
        expect(parseNumber(1)).toEqual(1);
      });

      it('returns parsed float', () => {
        expect(parseNumber('1.5')).toEqual(1.5);
        expect(parseNumber(1.5)).toEqual(1.5);
      });

      it('returns 0 for NaN', () => {
        expect(parseNumber('X')).toEqual(0);
      });
    });

    describe('parsePrice', () => {
      it('returns parsed price', () => {
        expect(parsePrice('$1')).toEqual(1);
        expect(parsePrice('$10.50')).toEqual(10.5);
      });

      it('returns 0 for NaN', () => {
        expect(parsePrice('$X.XX')).toEqual(0);
      });

      it('throws if argument has no leading dollar sign', () => {
        expect(() => parsePrice('1')).toThrowError('Invalid input');
      });
    });

    describe('toUpperCase', () => {
      it('returns upper-case string', () => {
        expect(toUpperCase('test')).toEqual('TEST');
      });
    });
  });
});
