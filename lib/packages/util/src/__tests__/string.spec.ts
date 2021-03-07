import {convertStringToByteArray} from '../convertStringToByteArray';
import {convertByteArrayToString} from '../convertByteArrayToString';

describe('String Conversions', () => {
    const TestString = 'Test string: çãá😀';
    const TestBytes = new Uint8Array([84, 101, 115, 116, 32, 115, 116, 114, 105, 110, 103, 58, 32, 195, 167, 195, 163, 195, 161, 240, 159, 152, 128]);
    describe('convertStringToByteArray', () => {

        it('should convertStringToByteArray()', () => {
            expect(convertStringToByteArray(TestString)).toEqual(TestBytes);
        });

    });

    describe('convertByteArrayToString', () => {

        it('should convertByteArrayToString() entirely', () => {
            expect(convertByteArrayToString(TestBytes)).toEqual(TestString);
        });

        it('should convertByteArrayToString() partially', () => {
            expect(convertByteArrayToString(TestBytes, 2)).toEqual(TestString.substr(2));
            expect(convertByteArrayToString(TestBytes, 2, 8)).toEqual(TestString.substr(2, 8));
            expect(convertByteArrayToString(TestBytes, 0, 0)).toEqual('');
        });

        it('should not convertByteArrayToString() with invalid parameters - negative startIndex', () => {
            try {
                convertByteArrayToString(TestBytes, -2);
            } catch (e) {
                expect(e.message).toContain('Start index should not be negative');
            }
        });

        it('should not convertByteArrayToString() with invalid parameters - byte array too small', () => {
            try {
                convertByteArrayToString(TestBytes, 10, 100);
            } catch (e) {
                expect(e.message).toContain('Need at least 100 bytes to convert to an integer');
            }
        });

    });

    describe('convertBase36ToString', () => {

    });

});


