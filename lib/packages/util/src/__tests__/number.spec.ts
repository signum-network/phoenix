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

});
