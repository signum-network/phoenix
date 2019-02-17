/** @module util */
export * from './constructBurstAddress';
export * from './convertNumberToNQTString';
export * from './convertNQTStringToNumber';
export * from './convertNumericIdToAddress';
export * from './convertAddressToNumericId';
export * from './isBurstAddress';
export * from './splitBurstAddress';

/**
 * A useful regex for matching burst addresses
 */
export const burstAddressPattern = {
    '_': {pattern: new RegExp('\[a-zA-Z0-9\]')}
};
