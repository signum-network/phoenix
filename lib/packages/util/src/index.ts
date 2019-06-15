/** @module util */
export * from './convertNumberToNQTString';
export * from './convertNQTStringToNumber';
export * from './convertNumericIdToAddress';
export * from './convertBurstTimeToEpochTime';
export * from './convertBurstTimeToDate';
export * from './convertDateToBurstTime';
export * from './convertAddressToNumericId';
export * from './isBurstAddress';
export * from './sumNQTStringToNumber';
export * from './convertByteArrayToHexString';
export * from './convertHexStringToByteArray';
export * from './convertHexStringToDec';
export * from './convertHexStringToString';

/**
 * A useful regex for matching burst addresses
 *
 */
    // TODO: I doubt that this should be in the lib. Very UI specific
export const burstAddressPattern = {
    '_': {pattern: new RegExp('\[a-zA-Z0-9\]')}
};
