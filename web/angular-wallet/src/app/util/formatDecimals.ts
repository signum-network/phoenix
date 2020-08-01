export const formatDecimals = (val: number, decimals: number) => {
  return val / Math.pow(10, decimals);
}