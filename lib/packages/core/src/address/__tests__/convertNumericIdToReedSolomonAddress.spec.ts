import {convertNumericIdToReedSolomonAddress} from '../convertNumericIdToReedSolomonAddress';

describe('convertNumericIdToReedSolomonAddress', () => {

    it('should convert as expected', () => {
        expect(convertNumericIdToReedSolomonAddress('6502115112683865257', 'PREFIX')).toBe('PREFIX-K37B-9V85-FB95-793HN');
        expect(convertNumericIdToReedSolomonAddress('6502115112683865257', 'OTHER')).toBe('OTHER-K37B-9V85-FB95-793HN');
    });

    it('should throw as expected', () => {
        expect(() => convertNumericIdToReedSolomonAddress('', 'PREFIX')).toThrow('Invalid arguments');
        expect(() => convertNumericIdToReedSolomonAddress('6502115112683865257', '')).toThrow('Invalid arguments');
        expect(() => convertNumericIdToReedSolomonAddress('6502115112683865257', null)).toThrow('Invalid arguments');
        expect(() => convertNumericIdToReedSolomonAddress(null, 'PREFIX')).toThrow('Invalid arguments');
    });

});
