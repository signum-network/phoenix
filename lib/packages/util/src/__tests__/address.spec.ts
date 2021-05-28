import {convertAddressToNumericId} from '../convertAddressToNumericId';
import {convertNumericIdToAddress} from '../convertNumericIdToAddress';
import {isCorrectAddress} from '../isBurstAddress';

describe('Address Utils', () => {

    describe('convertAddressToNumericId', () => {

        it('should convertAddressToNumericId() successfully', () => {
            const numericId = convertAddressToNumericId('BURST-K37B-9V85-FB95-793HN');
            expect(numericId).toBe('6502115112683865257');
        });


        it('should fail convertAddressToNumericId() due to invalid address', () => {
            const numericId = convertAddressToNumericId('BURST-K37B-9V85-FB95-793H7');
            expect(numericId).toBeUndefined();
        });

        it('should fail convertAddressToNumericId() due to null/undefined/empty address', () => {
            let numericId = convertAddressToNumericId(null);
            expect(numericId).toBeUndefined();
            numericId = convertAddressToNumericId(undefined);
            expect(numericId).toBeUndefined();
            numericId = convertAddressToNumericId('');
            expect(numericId).toBeUndefined();
        });
    });

    describe('convertNumericIdToAddress', () => {

        it('should convertNumericIdToAddress() successfully', () => {
            const numericId = convertNumericIdToAddress('6502115112683865257');
            expect(numericId).toBe('BURST-K37B-9V85-FB95-793HN');
        });

        it('should fail convertNumericIdToAddress() due to null/undefined/empty address', () => {
            let numericId = convertNumericIdToAddress(null);
            expect(numericId).toBeUndefined();
            numericId = convertNumericIdToAddress(undefined);
            expect(numericId).toBeUndefined();
            numericId = convertNumericIdToAddress(' ');
            expect(numericId).toBeUndefined();
        });
    });


     describe('isBurstAddress', () => {

        it('isBurstAddress() true', () => {
            expect(isCorrectAddress('BURST-K37B-9V85-FB95-793HN')).toBeTruthy();
            expect(isCorrectAddress('BURST-K37B-9V85-FB95-793HN-2UCGWTUEEY66TN7RNC189PM19C4ATCEUGQV929IY1N24H0Y82Z')).toBeTruthy();
        });

        it('isBurstAddress() false', () => {
            expect(isCorrectAddress('BURST-K37B-9V85-FB95-793H5')).toBeFalsy();
            expect(isCorrectAddress('K37B-9V85-FB95-793HN')).toBeFalsy();
            expect(isCorrectAddress(null)).toBeFalsy();
            expect(isCorrectAddress(undefined)).toBeFalsy();
            expect(isCorrectAddress('  ')).toBeFalsy();
        });
     });

});
