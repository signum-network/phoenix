import {convertHexStringToByteArray} from '../convertHexStringToByteArray';
import {convertByteArrayToHexString} from '../convertByteArrayToHexString';
import {convertHexStringToString} from '../convertHexStringToString';
import {convertStringToHexString} from '../convertStringToHexString';
import {convertHexEndianess} from '../convertHexEndianess';
import {convertDecStringToHexString} from '../convertDecStringToHexString';
import BigNumber from 'bignumber.js';

describe('Hex String Conversions', () => {
    const TestHex = '0123456789ABCDEF';
    const TestBytes = new Uint8Array([1, 35, 69, 103, 137, 171, 205, 239]);
    const TestString = 'This is a test string';
    const TestStringHexEncoded = '546869732069732061207465737420737472696e67';

    describe('convertHexStringToByteArray', () => {

        it('should convertHexStringToByteArray()', () => {
            expect(convertHexStringToByteArray(TestHex)).toEqual(TestBytes);
            expect(convertHexStringToByteArray(TestHex.toLowerCase())).toEqual(TestBytes);
            expect(convertHexStringToByteArray('')).toEqual(new Uint8Array(0));
        });

        it('should throw Error on invalid Hex String #1', () => {
            try {
                convertHexStringToByteArray('TestInvalid');
                expect(false).toBe('Should throw exceptipn');
            } catch (e) {
            }
        });

        it('should throw Error on invalid Hex String #2', () => {
            try {
                convertHexStringToByteArray('0123456789ABCDE');
                expect(false).toBe('Should throw exceptipn');
            } catch (e) {
            }
        });

    });

    describe('convertByteArrayToHexString', () => {

        it('should convertByteArrayToHexString()', () => {
            expect(convertByteArrayToHexString(TestBytes)).toEqual(TestHex.toLowerCase());
            expect(convertByteArrayToHexString(TestBytes, true)).toEqual(TestHex);
        });

    });

    describe('convertHexStringToString', () => {

        it('should convertHexStringToString()', () => {
            expect(convertHexStringToString(TestStringHexEncoded)).toEqual(TestString);
        });


        it('should throw exception on convertHexStringToString() if hex string is invalid ', () => {
            try {
                expect(convertHexStringToString('invalidHexString')).toEqual(TestString);
                expect(false).toBe('Expected exception');
            } catch (e) {
                expect(e.message).toBe('Invalid Hex String: invalidHexString');
            }
        });

    });

    describe('convertStringToHexString', () => {

        it('should convertStringToHexString()', () => {
            expect(convertStringToHexString(TestString)).toEqual(TestStringHexEncoded);
        });

    });

    describe('convertHexEndianess', () => {

        it('should convertHexEndianess()', () => {
            expect(convertHexEndianess(TestHex)).toEqual('EFCDAB8967452301');
            expect(convertHexEndianess('EFCDAB8967452301')).toEqual(TestHex);
        });

    });

    describe('convertDecStringToHexString', () => {

        it('should convert positive number as expected', () => {
            expect(convertDecStringToHexString('12345678901234567890')).toEqual('ab54a98ceb1f0ad2');
        });

        it('should convert zero number as expected', () => {
            expect(convertDecStringToHexString(new BigNumber('0'))).toEqual('00');
        });

        it('should convert negative number as two\'s complement', () => {
            expect(convertDecStringToHexString(new BigNumber('-1234567890'))).toEqual('b669fd2e');
        });

        it('should throw an error on invalid number', () => {
            expect(() => {
                convertDecStringToHexString('abc');
            }).toThrow('Invalid argument: [abc] - Expected a valid decimal value');
        });

    });
});
