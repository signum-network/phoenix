import {convertHexStringToByteArray} from '../convertHexStringToByteArray';
import {convertByteArrayToHexString} from '../convertByteArrayToHexString';

describe('Hex String Conversions', () => {
    const TestHex = '0123456789ABCDEF';
    const TestBytes = [1, 35, 69, 103, 137, 171, 205, 239];

    describe('convertHexStringToByteArray', () => {

        it('should convertHexStringToByteArray()', () => {
            expect(convertHexStringToByteArray(TestHex)).toEqual(TestBytes);
            expect(convertHexStringToByteArray(TestHex.toLowerCase())).toEqual(TestBytes);
            expect(convertHexStringToByteArray('')).toEqual([]);
        });

        it('should throw Error on invalid Hex String', () => {
            try {
                convertHexStringToByteArray('TestInvalid');
                expect(false).toBe('Should throw exceptipn');
            } catch (e) {}
        });

    });

    describe('convertByteArrayToHexString', () => {

        it('should convertByteArrayToHexString()', () => {
            expect(convertByteArrayToHexString(TestBytes)).toEqual(TestHex.toLowerCase());
            expect(convertByteArrayToHexString(TestBytes, true)).toEqual(TestHex);
        });

    });

});
