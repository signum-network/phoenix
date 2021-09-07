export const asBool = (value: any, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }
  return value === 'true' || value === true;
};

export const asNumber = (value: any, defaultValue: number): number => {
  if (value === undefined) {
    return defaultValue;
  }
  return parseFloat(value);
};
