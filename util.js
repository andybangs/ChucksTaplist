// COMPARE FUNCTIONS

export function compareAsc(property, parseFn = toUpperCase) {
  return (a, b) => {
    const parsedA = parseFn(a[property]);
    const parsedB = parseFn(b[property]);

    if (parsedA < parsedB) return -1;
    if (parsedA > parsedB) return 1;
    return 0;
  };
}

export function compareDesc(property, parseFn = toUpperCase) {
  return (a, b) => {
    const parsedA = parseFn(a[property]);
    const parsedB = parseFn(b[property]);

    if (parsedA > parsedB) return -1;
    if (parsedA < parsedB) return 1;
    return 0;
  };
}

// PARSE FUNCTIONS

export function parseNumber(str) {
  const parsedStr = parseFloat(str);

  return Number.isNaN(parsedStr) ? 0 : parsedStr;
}

export function parsePrice(str) {
  if (str[0] !== '$') throw new Error('Invalid input');

  const parsedStr = parseFloat(str.slice(1));

  return Number.isNaN(parsedStr) ? 0 : parsedStr;
}

export function toUpperCase(str) {
  return str.toUpperCase();
}
