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
export * from './convertByteArrayToString';
export * from './convertByteArrayToHexString';
export * from './convertHexStringToByteArray';
export * from './convertHexStringToDecString';
export * from './convertHexStringToString';
export * from './convertStringToByteArray';
export * from './convertStringToHexString';


/**
 * A useful regex for matching burst addresses
 *
 */
    // TODO: I doubt that this should be in the lib. Very UI specific
export const burstAddressPattern = {
    '_': {pattern: new RegExp('\[a-zA-Z0-9\]')}
};
