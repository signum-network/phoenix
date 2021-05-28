import {isReedSolomonAddress, tokenizeRSAddressParts, isValidAddress} from '../isReedSolomonAddress';

describe('isCorrectAddress', () => {

    describe('parseAddressParts', () => {

        it('should return all parts as expected - non-extended address', () => {
            expect(tokenizeRSAddressParts('BURST-K37B-9V85-FB95-793HN')).toStrictEqual({
                prefix: 'BURST',
                rs: 'K37B-9V85-FB95-793HN',
                extension: ''
            });
            expect(tokenizeRSAddressParts('S-K37B-9V85-FB95-793HN')).toStrictEqual({
                prefix: 'S',
                rs: 'K37B-9V85-FB95-793HN',
                extension: ''
            });
            expect(tokenizeRSAddressParts('TS-K37B-9V85-FB95-793HN')).toStrictEqual({
                prefix: 'TS',
                rs: 'K37B-9V85-FB95-793HN',
                extension: ''
            });
        });

        it('should return all parts as expected - extended address', () => {
            expect(tokenizeRSAddressParts('BURST-9K9L-4CB5-88Y5-F5G4Z-1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI')).toStrictEqual({
                prefix: 'BURST',
                rs: '9K9L-4CB5-88Y5-F5G4Z',
                extension: '1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI'
            });
            expect(tokenizeRSAddressParts('S-9K9L-4CB5-88Y5-F5G4Z-1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI')).toStrictEqual({
                prefix: 'S',
                rs: '9K9L-4CB5-88Y5-F5G4Z',
                extension: '1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI'
            });
            expect(tokenizeRSAddressParts('TS-9K9L-4CB5-88Y5-F5G4Z-1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI')).toStrictEqual({
                prefix: 'TS',
                rs: '9K9L-4CB5-88Y5-F5G4Z',
                extension: '1TXTEKKQJ9E1P5COO4IEUNKUJ2YTE0ETSF8UVVRSOKNJGX07WI'
            });
        });

        it('should throw error for invalid addresses', () => {
            expect(() => {
                tokenizeRSAddressParts('somestring');
            }).toThrow('Invalid RS Address: somestring');
            expect(() => {
                tokenizeRSAddressParts('');
            }).toThrow('Invalid RS Address: ');
            expect(() => {
                tokenizeRSAddressParts('TS-9K9L-4CB5-88Y5');
            }).toThrow('Invalid RS Address: ');
            expect(() => {
                tokenizeRSAddressParts('TS-9K9L-4CB5-88Y5-09e38e-00727-ihagsg');
            }).toThrow('Invalid RS Address: ');
        });
    });

    describe('isCorrectAddress', () => {

        it('isCorrectAddress() true', () => {
            expect(isReedSolomonAddress('BURST-K37B-9V85-FB95-793HN')).toBeTruthy();
            expect(isReedSolomonAddress('BURST-K37B-9V85-FB95-793HN-2UCGWTUEEY66TN7RNC189PM19C4ATCEUGQV929IY1N24H0Y82Z')).toBeTruthy();
        });

        it('isCorrectAddress() false', () => {
            expect(isReedSolomonAddress('BURST-K37B-9V85-FB95-793H5')).toBeFalsy();
            expect(isReedSolomonAddress('K37B-9V85-FB95-793HN')).toBeFalsy();
            expect(isReedSolomonAddress(null)).toBeFalsy();
            expect(isReedSolomonAddress(undefined)).toBeFalsy();
            expect(isReedSolomonAddress('  ')).toBeFalsy();
        });
    });

});
