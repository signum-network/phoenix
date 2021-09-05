export const asBool = (value: any, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }
  return value === 'true' || value === true;
};
