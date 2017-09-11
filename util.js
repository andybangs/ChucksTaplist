// @flow
import { CTCompareFunction } from './types';

// COMPARE FUNCTIONS

export function compareAsc(
  property: string,
  parseFn?: Function = toUpperCase
): CTCompareFunction {
  return (a, b) => {
    const parsedA = parseFn(a[property]);
    const parsedB = parseFn(b[property]);

    if (parsedA < parsedB) return -1;
    if (parsedA > parsedB) return 1;
    return 0;
  };
}

export function compareDesc(
  property: string,
  parseFn?: Function = toUpperCase
): CTCompareFunction {
  return (a, b) => {
    const parsedA = parseFn(a[property]);
    const parsedB = parseFn(b[property]);

    if (parsedA > parsedB) return -1;
    if (parsedA < parsedB) return 1;
    return 0;
  };
}

// PARSE FUNCTIONS

export function parseNumber(val: string | number): number {
  const parsedStr = parseFloat(val);

  return Number.isNaN(parsedStr) ? 0 : parsedStr;
}

export function parsePrice(val: string): number {
  if (val[0] !== '$') throw new Error('Invalid input');

  const parsedStr = parseFloat(val.slice(1));

  return Number.isNaN(parsedStr) ? 0 : parsedStr;
}

export function toUpperCase(val: string): string {
  return val.toUpperCase();
}
