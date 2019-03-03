/** @module util */
export * from './constructBurstAddress';
export * from './convertNumberToNQTString';
export * from './convertNQTStringToNumber';
export * from './convertNumericIdToAddress';
export * from './convertBurstTimeToEpochTime';
export * from './convertBurstTimeToDate';
export * from './convertAddressToNumericId';
export * from './isBurstAddress';
export * from './splitBurstAddress';

/**
 * A useful regex for matching burst addresses
 *
 */
    // TODO: I doubt that this should be in the lib. Very UI specific
export const burstAddressPattern = {
    '_': {pattern: new RegExp('\[a-zA-Z0-9\]')}
};
