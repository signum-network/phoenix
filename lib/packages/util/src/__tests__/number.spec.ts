import {convertNumberToNQTString} from '../convertNumberToNQTString';
import {convertNQTStringToNumber} from '../convertNQTStringToNumber';

describe('convertNumberToNQTString/convertNQTStringToNumber', () => {

    describe('convertNumberToNQTString', () => {

        it('should convertNumberToNQTString()', () => {
            let nqt = convertNumberToNQTString(0);
            expect(nqt).toBe('000000000');
            nqt = convertNumberToNQTString(123);
            expect(nqt).toBe('12300000000');
            nqt = convertNumberToNQTString(-1);
            expect(nqt).toBe('-100000000');
            nqt = convertNumberToNQTString(1.23);
            expect(nqt).toBe('123000000');
        });


        it('should fail convertNumberToNQTString() on invalid input', () => {
            try {
                const nqt = convertNumberToNQTString(null);
                expect(nqt).toBe('Expected exception');
            } catch (e) {
                expect(e.message).toBe('Invalid argument');
            }

            try {
                const nqt = convertNumberToNQTString(undefined);
                expect(nqt).toBe('Expected exception');
            } catch (e) {
                expect(e.message).toBe('Invalid argument');
            }
        });

    });


    describe('convertNQTStringToNumber', () => {

        it('should convertNQTStringToNumber()', () => {
            let burst = convertNQTStringToNumber('000000000');
            expect(burst).toBe(0);
            burst = convertNQTStringToNumber('12300000000');
            expect(burst).toBe(123);
            burst = convertNQTStringToNumber('-100000000');
            expect(burst).toBe(-1);
            burst = convertNQTStringToNumber('123000000');
            expect(burst).toBe(1.23);

        });


        it('should fail convertNQTStringToNumber() on invalid input', () => {
            try {
                const nqt = convertNQTStringToNumber('');
                expect(nqt).toBe('Expected exception');
            } catch (e) {
                expect(e.message).toBe('Invalid argument');
            }

            try {
                const nqt = convertNQTStringToNumber(null);
                expect(nqt).toBe('Expected exception');
            } catch (e) {
                expect(e.message).toBe('Invalid argument');
            }

            try {
                const nqt = convertNQTStringToNumber(undefined);
                expect(nqt).toBe('Expected exception');
            } catch (e) {
                expect(e.message).toBe('Invalid argument');
            }
        });

    });

});
