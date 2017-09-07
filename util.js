export function compareStr(property, dec) {
  return (a, b) => {
    const nameA = a[property].toUpperCase();
    const nameB = b[property].toUpperCase();

    if (dec === true) {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };
}

export function compareNum(property, dec) {
  return dec === true
    ? (a, b) => b[property] - a[property]
    : (a, b) => a[property] - b[property];
}
