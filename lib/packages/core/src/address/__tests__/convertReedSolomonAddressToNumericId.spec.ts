import {convertReedSolomonAddressToNumericId} from '../convertReedSolomonAddressToNumericId';

describe('convertReedSolomonAddressToNumericId', () => {

    it('should convert as expected', () => {
        expect(convertReedSolomonAddressToNumericId('PREFIX-K37B-9V85-FB95-793HN')).toBe('6502115112683865257');
        expect(convertReedSolomonAddressToNumericId('OTHER-K37B-9V85-FB95-793HN')).toBe('6502115112683865257');
    });

    it('should throw as expected', () => {
        expect(() => convertReedSolomonAddressToNumericId('6502115112683865257')).toThrow('Invalid Reed-Solomon Address Format: 6502115112683865257');
        expect(() => convertReedSolomonAddressToNumericId('')).toThrow();
        expect(() => convertReedSolomonAddressToNumericId(null)).toThrow();
    });

});
