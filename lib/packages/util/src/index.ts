/** @module util */
export * from './constructBurstAddress';
export * from './convertNumberToNQTString';
export * from './convertStringToNumber';
export * from './decode';
export * from './encode';
export * from './isBurstAddress';
export * from './isValid';
export * from './splitBurstAddress';

 /**
  * A useful regex for matching burst addresses
  */
export const burstAddressPattern = {
    '_': { pattern: new RegExp('\[a-zA-Z0-9\]') }
};
export const initialCodeword = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// tslint:disable-next-line:max-line-length
export const gexp: number[] = [1, 2, 4, 8, 16, 5, 10, 20, 13, 26, 17, 7, 14, 28, 29, 31, 27, 19, 3, 6, 12, 24, 21, 15, 30, 25, 23, 11, 22, 9, 18, 1];
// tslint:disable-next-line:max-line-length
export const glog: number[] = [0, 0, 1, 18, 2, 5, 19, 11, 3, 29, 6, 27, 20, 8, 12, 23, 4, 10, 30, 17, 7, 22, 28, 26, 21, 25, 9, 16, 13, 14, 24, 15];
export const cwmap: number[] = [3, 2, 1, 0, 7, 6, 5, 4, 13, 14, 15, 16, 12, 8, 9, 10, 11];
export const alphabet: string[] = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
export const base32Length = 13;

export const ginv = (a) => {
    return gexp[31 - glog[a]];
}

export const gmult = (a, b) => {
    if (a === 0 || b === 0) {
        return 0;
    }

    const idx = (glog[a] + glog[b]) % 31;

    return gexp[idx];
}
