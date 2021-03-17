import {convertHexStringToByteArray} from '../convertHexStringToByteArray';
import {convertByteArrayToHexString} from '../convertByteArrayToHexString';
import {convertHexStringToString} from '../convertHexStringToString';
import {convertStringToHexString} from '../convertStringToHexString';
import {convertHexEndianess} from '../convertHexEndianess';
import {convertDecStringToHexString} from '../convertDecStringToHexString';
import {convertHexStringToBase36String} from '../convertHexStringToBase36String';
import {convertBase36StringToHexString} from '../convertBase36StringToHexString';

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
            expect(convertDecStringToHexString('1')).toEqual('01');
            expect(convertDecStringToHexString('100')).toEqual('64');
            expect(convertDecStringToHexString('12345678901234567890')).toEqual('ab54a98ceb1f0ad2');
        });

        it('should convert zero number as expected', () => {
            expect(convertDecStringToHexString(new BigNumber('0'))).toEqual('00');
        });

        it('should convert negative number as two\'s complement', () => {
            expect(convertDecStringToHexString('-1')).toEqual('ff');
            expect(convertDecStringToHexString('-1000')).toEqual('fc18');
            expect(convertDecStringToHexString(new BigNumber('-1234567890'))).toEqual('b669fd2e');
            expect(convertDecStringToHexString(new BigNumber('-327803124352370'))).toEqual('fed5dd63377a8e');
        });

        it('should pad accordingly', () => {
            expect(convertDecStringToHexString('0', 4)).toEqual('0000');
            expect(convertDecStringToHexString('1000', 6)).toEqual('0003e8');
            expect(convertDecStringToHexString(new BigNumber('327803124352370'), 16)).toEqual('00012a229cc88572');

            expect(convertDecStringToHexString('-1', 4)).toEqual('ffff');
            expect(convertDecStringToHexString('-1000', 6)).toEqual('fffc18');
            expect(convertDecStringToHexString(new BigNumber('-327803124352370'), 16)).toEqual('fffed5dd63377a8e');
        });


        it('should throw an error on invalid number', () => {
            expect(() => {
                convertDecStringToHexString('abc');
            }).toThrow('Invalid decimal argument: [abc] - Expected a valid decimal value');
        });

        it('should throw an error on invalid padding', () => {
            expect(() => {
                convertDecStringToHexString('1000', -3);
            }).toThrow('Invalid padding argument: [-3] - Expected a positive value');
        });

    });

    describe('convertBase36StringToHexString', () => {
        it('should return the correct hex string', () => {
            expect(convertBase36StringToHexString('52M12IVV2RO5B03A568CVA5AO59D0Z1IF8ILFD11CS8M7N3AQE').toUpperCase()).toBe('CB85806964BB888E9AE1C2F27A3DB85D448B84FE9CB2BCCEAFBC49729A03AC16');
            expect(convertBase36StringToHexString('1UQDBIWHL54TH1HBIK1ZEQWQ3DR4MW6E5B3SNDK1HM9TMLL1T2').toUpperCase()).toBe('4A5FA0EE4E40BA8D322EF75963D6B8E71BD206897326CC9683960C9D2FF25966');
        });
    });

    describe('convertHexStringToBase36String', () => {
        it('should return the correct base36 string', () => {
            expect(convertHexStringToBase36String('CB85806964BB888E9AE1C2F27A3DB85D448B84FE9CB2BCCEAFBC49729A03AC16').toUpperCase()).toBe('52M12IVV2RO5B03A568CVA5AO59D0Z1IF8ILFD11CS8M7N3AQE');
            expect(convertHexStringToBase36String('4A5FA0EE4E40BA8D322EF75963D6B8E71BD206897326CC9683960C9D2FF25966').toUpperCase()).toBe('1UQDBIWHL54TH1HBIK1ZEQWQ3DR4MW6E5B3SNDK1HM9TMLL1T2');
        });
    });
});
