import {convertAddressToNumericId} from '../convertAddressToNumericId';
import {convertNumericIdToAddress} from '../convertNumericIdToAddress';
import {isBurstAddress} from '../isBurstAddress';

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
            expect(isBurstAddress('BURST-K37B-9V85-FB95-793HN')).toBeTruthy();
        });

        it('isBurstAddress() false', () => {
            expect(isBurstAddress('BURST-K37B-9V85-FB95-793H5')).toBeFalsy();
            expect(isBurstAddress('K37B-9V85-FB95-793HN')).toBeFalsy();
            expect(isBurstAddress(null)).toBeFalsy();
            expect(isBurstAddress(undefined)).toBeFalsy();
            expect(isBurstAddress('  ')).toBeFalsy();
        });
    });

});
